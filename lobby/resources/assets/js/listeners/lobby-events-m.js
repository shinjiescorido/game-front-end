import Xpacket from '../lib/XPacket';
import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap, setCurrentTimezone } from '../factories/factories';

window.all_tables = [];

let instance = null;
let hot_tables_sample = [];
let sicboTables = null;
let baccaratTables = null;
let baccaratSuper6Tables = null;
let baccaratBonusTables = null;
let dragontigerTables = null;
let pokerTables = null;

let lang = window.language.locale;
let sounds = [
  {
    id: "welcome",
    src: "/sound/" + lang + "/mode-1/welcome-nihtan.mp3"
  }
]

for (var x = 0; x < sounds.length; x++) {
  createjs.Sound.registerSound(sounds[x]);
}

let sortData = function(data, type, newFormat = true) {
    if (window.userAuthority === 'admin') return data;

    let maintenanceTables = [];

    if (newFormat) {
        maintenanceTables = _.filter(data, (data) => {
            return _.find(data.maintenanceSetting.maintenance, (m) => {
                return m.type == type && _.find(m.info, (s) => { return s.status == 1 }) 
            })
        })
    }
    else {
        maintenanceTables = _.filter(data, (data) => {
            return _.find(data.maintenanceSetting, (m) => { return m.status == 1 })
        })
    }

    
    let activeTbl = _.differenceBy(data, maintenanceTables, 'tableNumber');
    data = activeTbl.concat(maintenanceTables);

    return data;
}

const listen = (self) => {

    self.socket.on("disconnect", () => {
        self.socket.on('connect', function (e) {
        });
    });

    self.socket.on('connect', function (e) {
    });

    self.socket.on("push", (data)=>{
        let data_res = Xpacket.received(data)
        switch(data_res.eventName) {
            case "maintenanceChange" :
                setMaintenance(data_res)
                break;
        }
    });

    self.socket.emit('register', {
        id: window.userId
    });

    self.socket.on("data", (data)=>{
        setTimeout(() => {
            let data_res = Xpacket.received(data)

            switch(data_res.eventName) {
                case ("setbettingtime") :
                    setTimer(data_res);
                    break;
                case ("bettimer") :
                    setTimer(data_res);
                    break;
                case ("newround") :
                    setNewRound(data_res);
                    break;
                case ("displayresult") :
                case ("displayresults") :
                    setResult(data_res);
                    break;
                case "updatecredits":
                    updatecredits(data_res);
                break;
                case ("stoptimer") :
                    setTimer(data_res);
                    break;
                case ("setroundprogress") :
                    setTimer(data_res);
                    break;
                case("inputitem") :
                    setCardSwipe(data_res)
                    break;
                case ("mainmaintenancechange") :
                    setMainMaintenance(data_res.data);
                    break;
                case "maintenanceChange" :
                    setMaintenance(data_res)
                    break;
                case "shoechange" :
                    shoechange(data_res)
                    break;
                case "displaymodify" :
                    displaymodify(data_res)
                    break;
                case ("dealerchange") :
                    setDealer(data_res);
                    break;
                case ("mainnoticechange") :
                    setNotice(data_res);
                    break;
                case ("init") :
                    // Notice
                    if (data_res.data[0].mainNotice) {
                        __global.lobby_header.setAnnouncement(data_res.data[0].mainNotice);
                    }
                    break;
            }

        }, 1000)
    });
     let setMainMaintenance =  function(data) {
        // if (data.status == 1) {
        //     self.lobby_maintenance.maintenanceStart(data);
        // }
        // else {
        //     self.lobby_maintenance.maintenanceEnd();
        // }

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
            $('.subText').html(subText);
            $('.schedule').html(newStartTime+' ~ '+newEndTime);
            $('.maintenanceOverlay').show();
            $("#myCanvas").hide()
        }
        else {
            $('.maintenanceOverlay').hide();
            $("#myCanvas").show()
        }
    }

    if(parseInt(JSON.parse(window.maintenance).status)) {
        setMainMaintenance(JSON.parse(window.maintenance))
    }

    let setNotice = function(data) {
        __global.lobby_header.setAnnouncement(data.data);

        window.all_tables.forEach((e, x)=>{
            e.mainNotice = data.data;
        });
    }

    let updatecredits = (data) => {
        let user_money = 0;

        if (data.payload.credits.money) {
            __global.lobby_header.user_money = data.payload.credits.money;
            __global.lobby_header.updateMoney();
        }

        if (data.payload.credits.total_winning) {
            self.lobby_win_popup.animatePopup(data.gameName, parseInt(data.payload.credits.total_winning));
        }
      }

    let setDealer = function(data) {
        window.all_tables.forEach((e, x)=>{
            if(e.gameName == data.gameName && parseInt(e.tableNumber) == parseInt(data.tableId)) {
              e.dealerId = data.dealerId;
              e.currentDealer = data.dealerName;
            }
        });

        // For blob dealer image
        $.post(`/getChangeDealerImg`, {dealerId : data.dealerId},  (response) => {
            window.dealerImg.push(response[0]);

            if (self.lobby_liveGames.all_list_table.length) {
                self.lobby_liveGames.all_list_table.forEach((e, x)=>{
                    if(e.game_name != data.gameName || parseInt(e.table_number) != parseInt(data.tableId)) {
                        return;
                    }

                    let dbImage = new Image();
                    dbImage.src = response[0].dealer_image;
                    e.dealer_img.image = dbImage;
                    e.dealer_name.text = data.dealerName;
                    e.dealer_id = response[0].id;
                });
            }
        });
    }

    let displaymodify = (data) =>{
        window.all_tables.forEach((row)=>{
            if(row.tableNumber == data.tableId && row.gameName == data.gameName) {
                if (data.gameName == 'Poker') {
                    row.marks.pop();
                    row.marks.push(data.data.mark);
                    row.meta = data.meta;
                } else if (data.gameName == 'Sicbo') {
                    row.marks.pop();
                    row.marks.push(data.data.mark);
                } else {
                    row.marks = data.data.mark;
                }
            }
        });

        switch (data.gameName) {
            case "Sicbo" :
                sicboTables = _.filter(all_tables, function(row) { return row.gameName == "Sicbo" });
                self.lobby_sicboTables.setResult(sicboTables, data.gameName, data.tableId);
                break;
            case "Baccarat" :
                baccaratTables = _.filter(all_tables, function(row) { return row.gameName == "Baccarat" && (!row.slave || !row.slave.length) });
                baccaratSuper6Tables = _.filter(all_tables, function(row) { return row.gameName == "Baccarat" && row.slave == 'supersix' });
                baccaratBonusTables = _.filter(all_tables, function(row) { return row.gameName == "Baccarat" && row.slave == 'bonus' });

                baccaratTables = sortData(baccaratTables, 'normal');
                baccaratBonusTables = sortData(baccaratBonusTables, 'bonus');
                baccaratSuper6Tables = sortData(baccaratSuper6Tables, 'supersix');
                
                self.lobby_baccaratTables.setResult(baccaratTables, data.gameName, data.tableId);
                break;
            case "Dragon-Tiger" :
                dragontigerTables = _.filter(all_tables, function(row) { return row.gameName == "Dragon-Tiger"  });
                dragontigerTables = sortData(dragontigerTables, '', false);
                self.lobby_dragonTigerTables.setResult(dragontigerTables, data.gameName, data.tableId);
                break;
            case "Poker" :
                pokerTables = _.filter(all_tables, function(row) { return row.gameName == "Poker"  });
                self.lobby_pokerTables.setResult(pokerTables, data.gameName, data.tableId, data.meta); //data.meta
                break;
        }

        self.lobby_liveGames.setResult(baccaratTables, data.gameName, data.tableId, data.meta); //data.meta

        // Main lobby
        for(var x = 0; x < self.hot_live_games.length; x++) {
            if((data.gameName+"/"+data.tableId) == self.hot_live_games[x].namespace) {
                self.lobby_main.makeRoadmap(self.hot_live_games[x], x)
            }
        }
    }
     $("#shoechangeDT").on("click", () =>{
        shoechange({tableId : 1, gameName : 'Dragon-Tiger'})
    })
    $("#shoechangeBC").on("click", () =>{
        shoechange({tableId : 2, gameName : 'Baccarat'})
    })
    // setTimeout(() => {
    //     shoechange({tableId : 1, gameName : 'Dragon-Tiger'})
    // },10000)


    // setTimeout(() => {
    //     shoechange({tableId : 2, gameName : 'Baccarat'})
    // },18000)

    let shoechange = (data) =>{
        window.all_tables.forEach((row)=>{
            if(row.tableNumber == data.tableId && row.gameName == data.gameName) {
                row.marks = [];
                row.is_shoeChange = true;
            }
        });

        if(self.lobby_main.hot_game.length) {
            self.lobby_main.hot_game.forEach((table)=>{
                if(table.namespace == data.gameName+"/"+data.tableId) {
                    table.roadmap_container.removeAllChildren();
                }
            });
        }

        if(self.lobby_liveGames.all_list_table.length) {

            self.lobby_liveGames.all_list_table.forEach((e, x)=>{
                if(e.game_name == data.gameName && e.table_number == data.tableId) {
                    try {
                        e.bigroad_container.removeAllChildren();
                        e.bigroad_container.updateCache();
                    } catch(err) {
                        console.log(err)
                    }
                    try {
                        e.pearlroad_container.removeAllChildren();
                        e.pearlroad_container.updateCache();
                    } catch(err) {
                        console.log(err)
                    }
                    try {
                        e.bigeyeboy_container.removeAllChildren();
                        e.bigeyeboy_container.updateCache();
                    } catch(err) {
                        console.log(err)
                    }
                    try {
                        e.cockroach_container.removeAllChildren();
                        e.cockroach_container.updateCache();
                    } catch(err) {
                        console.log(err)
                    }
                    try {
                        e.small_container.removeAllChildren();
                        e.small_container.updateCache();
                    }
                    catch(err) {
                        console.log(err)
                    }

                    e.status.text = window.language.prompts.promptshuffling
                    if(e.game_name != "Baccarat") {
                        e.cockroachroad_container.removeAllChildren();
                        e.smallroad_container.removeAllChildren();
                    }

                    if(e.game_name == "Baccarat" || e.game_name == "Dragon-Tiger") {
                        e.deal_count.text = 0
                    }
                }
            });
        }


        if(self.lobby_baccaratTables.all_list_table.length) {
            self.lobby_baccaratTables.all_list_table.forEach((e, x)=>{
                if(e.game_name == data.gameName  && e.table_number == data.tableId) {
                    e.status.text = window.language.prompts.promptshuffling


                     try {
                        e.tie_total_text.text = 0;

                        e.banker_total_text.text = 0;
                        e.bankerpair_total_text.text = 0;
                        e.bankernautral_total_text.text = 0;

                        e.playernatural_total_text.text = 0;
                        e.playerpair_total_text.text = 0;
                        e.player_total_text.text = 0;
                        e.banker_percent.text = '0%';
                        e.player_percent.text = '0%';
                        e.deal_count.text = 0;

                        e.bigroad_container.removeAllChildren();
                        e.bigroad_container.updateCache();
                    } catch(err) {
                        console.log(err)
                    }
                    try {
                        e.pearlroad_container.removeAllChildren();
                        e.pearlroad_container.updateCache();
                    } catch(err) {
                        console.log(err)
                    }
                    try {
                        e.bigeyeboy_container.removeAllChildren();
                        e.bigeyeboy_container.updateCache();
                    } catch(err) {
                        console.log(err)
                    }
                    try {
                        e.cockroach_container.removeAllChildren();
                        e.cockroach_container.updateCache();
                    } catch(err) {
                        console.log(err)
                    }
                    try {
                        e.small_container.removeAllChildren();
                        e.small_container.updateCache();
                        e.deal_count.text = 0
                    }
                    catch(err) {
                        console.log(err)
                    }

                }
            });
        }

        if(self.lobby_dragonTigerTables.all_list_table.length) {
            self.lobby_dragonTigerTables.all_list_table.forEach((e, x)=>{
                if(e.game_name == data.gameName  && e.table_number == data.tableId) {
                    e.status.text = window.language.prompts.promptshuffling

                    e.pearlroad_container.removeAllChildren();

                    e.bigroad_container.removeAllChildren();
                    e.bigroad_container.updateCache();

                    e.bigeyeboy_container.removeAllChildren();
                    e.bigeyeboy_container.updateCache();
                    

                    try {
                        e.dragon_count.text = 0;
                        e.dragon_small_count.text = 0;
                        e.dragon_big_count.text = 0;
                        e.dragon_odd_count.text = 0;
                        e.dragon_even_count.text = 0;
                        e.tiger_count.text = 0;
                        e.tiger_small_count.text = 0;
                        e.tiger_big_count.text = 0;
                        e.tiger_odd_count.text = 0;
                        e.tiger_even_count.text = 0;
                        e.tiger_percent.text = '0%';
                        e.dragon_percent.text = '0%';
                        e.deal_count.text = 0;
                        
                        e.smallroad_container.removeAllChildren();
                        e.smallroad_container.updateCache();
                    } catch(err) {
                        console.log(err)
                    }
                    try {
                        e.cockroachroad_container.removeAllChildren();
                        e.cockroachroad_container.updateCache();
                    } catch(err) {
                        console.log(err)
                    }
                }
            });
        }
    } // end shoechange

    //
    let setMaintenance =  function(data) {

        function byKey(key) {
            return function (o) {
                var v = parseInt(o[key], 10);
                return isNaN(v) ? o[key] : v;
            };
        }

        all_tables = _.sortBy(all_tables, ['gameName', byKey('tableNumber')]);

        if(data.data.status) {
            // self.hot_live_games.forEach((row)=>{
            //     if(row.namespace == data.gameName+"/"+data.tableId) {
            //     }
            // })

            // self.hot_live_games = _.filter(self.hot_live_games , (e)=>{
            //     return e.namespace !=data.gameName+"/"+data.tableId;
            // });

            // self.hot_live_games = _.uniqBy( _.filter(window.all_tables,(e)=>{return  !_.filter(e.maintenanceSetting,(d)=>{return d.status}).length }),(row)=>{return row.gameName} );
            
            let tempTable1 = [];
            for (var i = 0; i < window.all_tables.length; i++) {
                if (window.all_tables[i].gameName === 'Baccarat' || window.all_tables[i].gameName === 'Poker') {
                    for (var x = 0; x < window.all_tables[i].maintenanceSetting.maintenance.length; x++) {
                        let mainTable = window.all_tables[i].maintenanceSetting.maintenance[x];

                        if (mainTable.info[0].status === 0 && mainTable.info[1].status === 0 && mainTable.type === 'normal') {
                            tempTable1.push(window.all_tables[i]);
                        }
                    }
                }
                else {
                   if (window.all_tables[i].maintenanceSetting[0].status === 0 && window.all_tables[i].maintenanceSetting[1].status === 0) {
                        tempTable1.push(window.all_tables[i]);
                    } 
                }
            }

            self.hot_live_games = _.uniqBy(tempTable1, (row) => { return row.gameName });
            self.hot_live_games.splice(3, 1);

            if(self.lobby_main.hot_games_container) {
                self.lobby_main.makeHotTables(self.hot_live_games)
            }
        }

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

        baccaratTables = _.filter(all_tables, function(row) { return row.gameName == "Baccarat" && (!row.slave || !row.slave.length) });
        baccaratSuper6Tables = _.filter(all_tables, function(row) { return row.gameName == "Baccarat" && row.slave == 'supersix' });
        baccaratBonusTables = _.filter(all_tables, function(row) { return row.gameName == "Baccarat" && row.slave == 'bonus' });

        dragontigerTables = _.filter(all_tables, function(row) { return row.gameName == "Dragon-Tiger"  });

        //redraw if maintenance update
        if(self.lobby_liveGames.list_view.children.length) {
            setTimeout(() => {
                toggleView("sub_baccarat");
            },50)
        }

         if(self.lobby_baccaratTables.list_view.children.length) {
            setTimeout(() => {
                toggleView("sub_baccarat");
            },50)
        }


         if(self.lobby_dragonTigerTables.list_view.children.length) {
            setTimeout(() => {
                toggleView("sub_sicbo");
                toggleView("sub_dragonTiger");
            },50)
        }


        self.lobby_liveGames.all_list_table.forEach((e, x)=>{
            if(e.game_name != data.gameName || e.table_number != data.tableId) {
                return;
            }

            if (data.gameName == 'Baccarat' || data.gameName == 'Sicbo' || data.gameName == 'Poker' || data.gameName == 'Dragon-Tiger') {
              self.lobby_liveGames.setMaintenance(data, x);
            }
        });

        self.lobby_baccaratTables.all_list_table.forEach((e, x)=>{
            if(e.game_name != data.gameName || e.table_number != data.tableId) {
                return;
            }

            if (data.gameName == 'Baccarat') {
              self.lobby_baccaratTables.setMaintenance(data, x);
            }
        });

        self.lobby_sicboTables.all_list_table.forEach((e, x)=>{
            if(e.game_name != data.gameName || e.table_number != data.tableId) {
                return;
            }

            if (data.gameName == 'Sicbo') {
              self.lobby_sicboTables.setMaintenance(data, x);
            }
        });

        self.lobby_dragonTigerTables.all_list_table.forEach((e, x)=>{
            if(e.game_name != data.gameName || e.table_number != data.tableId) {
                return;
            }

            if (data.gameName == 'Dragon-Tiger') {
              self.lobby_dragonTigerTables.setMaintenance(data, x);
            }
        });

        self.lobby_pokerTables.all_list_table.forEach((e, x)=>{
            if(e.game_name != data.gameName || e.table_number != data.tableId) {
                return;
            }

            if (data.gameName == 'Poker') {
              self.lobby_pokerTables.setMaintenance(data, x);
            }
        });

        // // === pulaputi
        // self.lobby_pulaputiTables.all_list_table.forEach((e, x)=>{
        //    if(e.game_name != data.gameName || e.table_number != data.tableId) {
        //         return;
        //     }
        //     e.round_num.text = data.roundNum;
        //     e.status.text = 'Now Betting';

        //     if (data.gameName == 'Pula-Puti') {
        //         self.lobby_pulaputiTables.setMaintenance(data, x);
        //     }
        // });

        // // === bigwheel
        // self.lobby_bigWheelTables.all_list_table.forEach((e, x)=>{
        //    if(e.game_name != data.gameName || e.table_number != data.tableId) {
        //         return;
        //     }
        //     e.round_num.text = data.roundNum;
        //     e.status.text = 'Now Betting';

        //     if (data.gameName == 'Big-Wheel') {
        //         self.lobby_bigWheelTables.setMaintenance(data, x);
        //     }
        // });
    }

    self.initTable = function (data) {
        // if (data) {
        //     setMainMaintenance(data.data[0].mainMaintenance);
        // }
        all_tables = _.sortBy (all_tables, (row) => {
            return row.gameName
        });

        let game = ["Poker/1", "Sicbo/1", "Baccarat/1","Dragon-Tiger/1"];

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
        }

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

        // Hot Games
        let tempTable1 = [];
        for (var i = 0; i < window.all_tables.length; i++) {
            if (window.all_tables[i].gameName === 'Baccarat' || window.all_tables[i].gameName === 'Poker') {
                for (var x = 0; x < window.all_tables[i].maintenanceSetting.maintenance.length; x++) {
                    let mainTable = window.all_tables[i].maintenanceSetting.maintenance[x];

                    if (mainTable.info[0].status === 0 && mainTable.info[1].status === 0 && mainTable.type === 'normal') {
                        tempTable1.push(window.all_tables[i]);
                    }
                }
            }
            else {
               if (window.all_tables[i].maintenanceSetting[0].status === 0 && window.all_tables[i].maintenanceSetting[1].status === 0) {
                    tempTable1.push(window.all_tables[i]);
                } 
            }
        }

        self.hot_live_games = _.uniqBy(tempTable1, (row) => { return row.gameName });
        self.hot_live_games.splice(3, 1);
        self.lobby_main.makeHotTables(self.hot_live_games);

        // self.hot_live_games = _.uniqBy( _.filter(window.all_tables,(e)=>{return  !_.filter(e.maintenanceSetting,(d)=>{return d.status}).length }),(row)=>{return row.gameName} );
        

        //== baccarat tables
        baccaratTables = _.filter(all_tables, function(row) { return row.gameName == "Baccarat" && (!row.slave || !row.slave.length) });
        // baccaratTables = _.filter(all_tables, function(row) { return row.gameName == "Baccarat" });

        for(var x = 0; x < baccaratTables.length;x++) {
            var c = document.createElement("canvas");
            var d = document.createElement("div");
            var child_D = document.createElement("div");

            c.setAttribute("id", "bc-"+x)
            c.setAttribute("width", "1280px");
            c.setAttribute("height", "300px");

            d.setAttribute("class", "dummy-tables");
            child_D.setAttribute("class", "dealer-bg");

            $(".bc-tables").append(c);
            // $(".bc-tables").append(d);
            $(d).append(child_D);

            $(d).css({
                'top' : (x*304) + 4.45,
            })

            baccarat_c[x] = new createjs.Stage("bc-"+x);
            baccarat_c[x].x = 15;
            baccarat_c[x].y = 5;

            createjs.Touch.enable(baccarat_c[x] ,false, true);
            baccarat_c[x].preventSelection = false;
        }
        //baccarat supersix tables
        baccaratSuper6Tables = _.filter(all_tables, function(row) { return row.gameName == "Baccarat" && row.slave == 'supersix' });
        baccaratBonusTables = _.filter(all_tables, function(row) { return row.gameName == "Baccarat" && row.slave == 'bonus' });

        //set sicbo games data
        sicboTables = _.filter(all_tables, function(row) { return row.gameName == "Sicbo" });
        for(var x = 0; x < sicboTables.length;x++) {
            var c = document.createElement("canvas");
            var d = document.createElement("div");
            c.setAttribute("id", "sb-"+x)
            c.setAttribute("width", "1280px");
            c.setAttribute("height", "300px");

            d.setAttribute("class", "dummy-tables");

            $(".sb-tables").append(c);

            sicbo_c[x] = new createjs.Stage("sb-"+x);
            sicbo_c[x].x = 15;
            sicbo_c[x].y = 5;
        }

        // === dragontiger
        dragontigerTables = _.filter(all_tables, function(row) { return row.gameName == "Dragon-Tiger"  });
        for(var x = 0; x < dragontigerTables.length;x++) {
            var c = document.createElement("canvas");
            c.setAttribute("id", "dt-"+x)
            c.setAttribute("width", "1280px");
            c.setAttribute("height", "300px");
            $(".dt-tables").append(c);

            dragontiger_c[x] = new createjs.Stage("dt-"+x);
            dragontiger_c[x].x = 15;
            dragontiger_c[x].y = 5;
        }

        // self.lobby_dragonTigerTables.makeDtTables(dragontigerTables);

        // === poker
        pokerTables = _.filter(all_tables, function(row) { return row.gameName == "Poker"  });
        for(var x = 0; x < pokerTables.length;x++) {
            var c = document.createElement("canvas");
            c.setAttribute("id", "poker-"+x)
            c.setAttribute("width", "1280px");
            c.setAttribute("height", "300px");
            c.setAttribute("class", "poker-canvas");
            $(".poker-tables").append(c);

            poker_c[x] = new createjs.Stage("poker-"+x);
            poker_c[x].x = 15;
            poker_c[x].y = 5;
        }
    }

    if(self.data_flag) {
        all_tables[0].mainMaintenance.end_time = "2017-11-20 05:00";
        all_tables[0].mainMaintenance.start_time = "2017-11-20 01:00";
        self.initTable({data:all_tables});
    }

    let setResult =  function(data) {
        all_tables.forEach( function(e,x) {
            switch(`${e.gameName} ${data.gameName} ${data.tableId}` ) {
                case "Sicbo Sicbo "+e.tableNumber :
                    e.marks.shift()
                    e.marks.push(data.mark);
                    break;
                case "Baccarat Baccarat "+e.tableNumber :
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
                    // e.marks.push(data.mark);
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
            } // end switch
        });

        baccaratTables = _.filter(all_tables, function(row) { return row.gameName == "Baccarat" && (!row.slave || !row.slave.length) });
        baccaratSuper6Tables = _.filter(all_tables, function(row) { return row.gameName == "Baccarat" && row.slave == 'supersix' });
        baccaratBonusTables = _.filter(all_tables, function(row) { return row.gameName == "Baccarat" && row.slave == 'bonus' });

        baccaratTables = sortData(baccaratTables, 'normal');
        baccaratBonusTables = sortData(baccaratBonusTables, 'bonus');
        baccaratSuper6Tables = sortData(baccaratSuper6Tables, 'supersix');
        dragontigerTables = sortData(dragontigerTables, '', false);

        self.lobby_liveGames.setResult(baccaratTables, data.gameName, data.tableId, data.meta);

        switch (data.gameName) {
            case "Sicbo" :
                self.lobby_sicboTables.setResult(sicboTables, data.gameName, data.tableId);
                break;
            case "Baccarat" :
                if(current_open == "sub_supersix") {
                    self.lobby_baccaratTables.setResult(baccaratSuper6Tables, data.gameName, data.tableId);
                } else if(current_open == "sub_bonus") {
                    self.lobby_banner.setResult(baccaratBonusTables, data.gameName, data.tableId, data.meta);
                }  else {
                    self.lobby_baccaratTables.setResult(baccaratTables, data.gameName, data.tableId);
                }
                break;
            case "Dragon-Tiger" :
                self.lobby_dragonTigerTables.setResult(dragontigerTables, data.gameName, data.tableId);
                break;
            case "Poker" :
                self.lobby_pokerTables.setResult(pokerTables, data.gameName, data.tableId, data.meta);
                break;
        }


        for(var x = 0; x < self.hot_live_games.length; x++) {
            if((data.gameName+"/"+data.tableId) == self.hot_live_games[x].namespace) {
                try {
                    self.lobby_main.makeRoadmap(self.hot_live_games[x], x)
                } catch(err) {
                    console.log(err)
                }
            }
        }
    }

    let dt_card_info = {'burn': null, 'tiger': null, 'dragon' : null};
    let setCardSwipe = function (data) {
        if(data.gameName == "Sicbo") return;

        window.all_tables.forEach((table)=>{
            if(table.gameName == data.gameName && table.tableNumber == data.tableId ) {
                if(table.gameName != "Dragon-Tiger") {
                    table.gameInfo = data.gameInfo
                } else if(table.gameName == "Dragon-Tiger") {
                    dt_card_info[data.type] = data.value;
                    table.gameInfo = _.pickBy(data.gameInfo, (value, key)=>{ return value; });
                }
            }
        });

        self.lobby_liveGames.inputResult(all_tables,data);

        switch  (data.gameName) {
            case "Baccarat" :
            case "baccarat" :
                // self.lobby_baccaratTables.inputResult(all_tables,data);
                if(current_open == "sub_supersix") {
                    self.lobby_baccaratTables.inputResult(baccaratSuper6Tables,data);
                } else if(current_open == "sub_bonus"){
                    self.lobby_baccaratTables.inputResult(baccaratBonusTables,data);
                } else {
                    self.lobby_baccaratTables.inputResult(baccaratTables,data);
                }
                break;
            case "Dragon-Tiger" :
            case "dragontiger" :
                // self.lobby_dragonTigerTables.inputResult(dragontigerTables,data);
                break;
            case "Poker" :
                self.lobby_pokerTables.inputResult(pokerTables,data);
                if(!self.is_mobile) {
                    self.lobby_banner.inputResult(pokerTables, data);
                }
                break;
        }
    }

    let setNewRound = function(data) {

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

                table.roundStatus = "S";
                table.currentRound = data.roundNum
            }
        });

        if(self.lobby_liveGames.all_list_table && self.lobby_liveGames.all_list_table.length) {
            self.lobby_liveGames.all_list_table.forEach((e, x)=>{
                if(e.game_name != data.gameName || e.table_number != data.tableId) {
                    return;
                }
                e.round_num.text = data.roundNum;

                if(e.card_result_container) {
                    e.card_result_container.removeAllChildren();
                }
            });
        }

        // === sicbo
        //
        if(self.lobby_sicboTables.all_list_table && self.lobby_sicboTables.all_list_table.length) {
            self.lobby_sicboTables.all_list_table.forEach((e, x)=>{
               if(e.game_name != data.gameName || e.table_number != data.tableId) {
                    return;
                }
                e.round_num.text = data.roundNum;
            });
        }

        // === baccarat

        if(self.lobby_baccaratTables.all_list_table && self.lobby_baccaratTables.all_list_table.length) {
            self.lobby_baccaratTables.all_list_table.forEach((e, x)=>{
                 if(e.game_name != data.gameName || e.table_number != data.tableId) {
                    return;
                }
                e.round_num.text = data.roundNum;

                if(e.card_result_container) {
                    e.card_result_container.removeAllChildren();
                }
            });
        }

        // === dragontiger

        if(self.lobby_dragonTigerTables.all_list_table && self.lobby_dragonTigerTables.all_list_table.length) {
            self.lobby_dragonTigerTables.all_list_table.forEach((e, x)=>{
                 if(e.game_name != data.gameName || e.table_number != data.tableId) {
                    return;
                }
                e.round_num.text = data.roundNum;

                if(e.card_result_container) {
                    e.card_result_container.removeAllChildren();
                }
            });
        }

         // === poker
        if(self.lobby_pokerTables.all_list_table && self.lobby_pokerTables.all_list_table.length) {
            self.lobby_pokerTables.all_list_table.forEach((e, x)=>{
                 if(e.game_name != data.gameName || e.table_number != data.tableId) {
                    return;
                }
                e.round_num.text = data.roundNum;

                if(e.card_result_container) {
                    e.card_result_container.removeAllChildren();
                }
            });
        }

    }
    /**
     * @param {eventDataobject}
     */
    let setTimer =  function(data) {
        // === all
        if(self.lobby_liveGames.all_list_table && self.lobby_liveGames.all_list_table.length) {
            self.lobby_liveGames.all_list_table.forEach((e, x)=>{
                if(e.game_name != data.gameName || e.table_number != data.tableId) {
                    return;
                }

                if(data.eventName =="stoptimer" || data.eventName =="setroundprogress") {
                    data.bettingTime = 0
                }

                timer(e,data);
            });
        }

        // === baccarat
        if(self.lobby_baccaratTables.all_list_table && self.lobby_baccaratTables.all_list_table.length) {
            self.lobby_baccaratTables.all_list_table.forEach((e, x)=>{
                if(e.game_name != data.gameName || e.table_number != data.tableId) {
                    return;
                }
                if(data.eventName =="stoptimer" || data.eventName =="setroundprogress") {
                    data.bettingTime = 0
                }
                timer(e,data);
            });
        }

        // === sicbo
        if(self.lobby_sicboTables.all_list_table && self.lobby_sicboTables.all_list_table.length) {
            self.lobby_sicboTables.all_list_table.forEach((e, x)=>{
              if(e.game_name != data.gameName || e.table_number != data.tableId) {
                    return;
                }
                if(data.eventName =="stoptimer" || data.eventName =="setroundprogress") {
                    data.bettingTime = 0
                }
                timer(e,data);
            });
        }

        // dragontiger tables
        if(self.lobby_dragonTigerTables.all_list_table && self.lobby_dragonTigerTables.all_list_table.length) {
            self.lobby_dragonTigerTables.all_list_table.forEach((e, x)=>{
                if(e.game_name != data.gameName || e.table_number != data.tableId) {
                    return;
                }
                if(data.eventName =="stoptimer" || data.eventName =="setroundprogress") {
                    data.bettingTime = 0
                }
                timer(e,data);
            });
        }

        // poker tables
        if(self.lobby_pokerTables.all_list_table && self.lobby_pokerTables.all_list_table.length) {
            self.lobby_pokerTables.all_list_table.forEach((e, x)=>{
                if(e.game_name != data.gameName || e.table_number != data.tableId) {
                    return;
                }
                if(data.eventName =="stoptimer" || data.eventName =="setroundprogress") {
                    data.bettingTime = 0
                }
                timer(e,data);
            });
        }

    }

    let timer = function(e, data) {
        if(!e.is_timerStart) {
            e.timer.visible = true
            e.timer.timer(data.bettingTime, parseInt(data.totalTime))
            e.is_timerStart = true;
            e.status.text = window.language.lobby.nowbetting;
            if(data.gameName == "Poker") {
                // e.status.text = data.type  == "startround" ?  window.language.lobby.nowbetting : "Bet " + data.type
                let status = "";

                if(data.type  == "startround") {
                    status = window.language.lobby.nowbetting
                } else if(data.type == "flop") {

                    status = window.language.poker.betflop
                } else if(data.type == "river") {
                    status = window.language.poker.betriver
                }
                else if(data.type == "turn") {
                    status = window.language.poker.betturn
                }
                e.status.text = status;
            }
        }

        if(data.bettingTime == 0) { // hiding bet time
            e.timer.visible = false
            e.status.text = window.language.lobby.bettingend;
            e.is_timerStart = false;
        }
    }
}

let current_open = "";
let last_clicked = "";
const someCallback = (param, self) => {
    if(!param) return;

    console.log("clicked param", param)
    //prevent bug scroll on bet history
    if(param == "thumbnail_bethistory")
    {
        $('.tables-container').css({'overflow' : 'hidden'});
    }else{
        $('.tables-container').css({'overflow' : 'scroll'});
    }

    if(param == "thumbnail_transactions" || param == "thumbnail_bethistory" || param == "thumbnail_howtoplay" || param == "thumbnail_settings") {
        return;
    }


    let hideComponents = () => {

        self.lobby_reelGames.reelgames_con.removeAllChildren();
        self.lobby_main.removeAllChildren();


        for(var x = 0; x < baccarat_c.length; x++) {
            baccarat_c[x].removeAllChildren();
        }

        for(var x = 0; x < sicbo_c.length; x++) {
            sicbo_c[x].removeAllChildren();
        }

        for(var x = 0; x < dragontiger_c.length; x++) {
            dragontiger_c[x].removeAllChildren();
        }


        for(var x = 0; x < poker_c.length; x++) {
            poker_c[x].removeAllChildren();
        }

        self.lobby_liveGames.list_view.removeAllChildren()

        self.lobby_baccaratTables.list_view.removeAllChildren();

        self.lobby_pokerTables.list_view.removeAllChildren();
        self.lobby_sicboTables.list_view.removeAllChildren();
        self.lobby_dragonTigerTables.list_view.removeAllChildren();

        self.lobby_popup_betHistory.removeAllChildren();
        // self.lobby_popup_settings.removeAllChildren();
        self.lobby_popup_transactions.removeAllChildren();
        self.lobby_popup_betHistory.visible = true;
        self.lobby_popup_transactions.visible = true;

         $('.kaga-container').hide();
        $("#lobby-content").hide();
    }

    if(last_clicked == param) {
        return;
    }
    hideComponents();

    switch (param) {
        case "reel_games" :
        case "allgames" :
                $("#lobby-content").show();
            break;

        case "kagaming" :
                $("#lobby-content").hide();
            break;
        case "live_games" :
            current_open = param;
            baccaratTables = sortData(baccaratTables, 'normal');

            self.lobby_liveGames.makeListTables(baccaratTables, self.lobby_liveGames.list_view, self.lobby_liveGames.all_list_table); //set all games data
            setTimeout(()=>{
                // console.log($("#lobby-content").height(), "lalalala")
            $(".hack").css('height', ($("#lobby-content").height() + 100)+"px");
            $(".hack").css('width' , $("#lobby-content").width()+"px");
            }, 100)

            break;

        case "sub_allGames":
            current_open = param;
            if(!self.is_mobile) {
                self.lobby_liveGames.makeThumbnailTables(all_tables, self.lobby_liveGames.thumbnail_view, self.lobby_liveGames.all_thumbnial_table); //set all games data thumbnail
                // self.lobby_liveGames.thumbnail_view.scrollprop = _.clone(self.lobby_scrollbar.scrollable(self.lobby_liveGames, self.lobby_liveGames.thumbnail_view, 1680, 900));
                self.lobby_liveGames.thumbnail_view.visible = true
            } else {
                self.lobby_liveGames.makeListTables(all_tables, self.lobby_liveGames.list_view, self.lobby_liveGames.all_list_table); //set all games data
            }

            $(".hack").css('height', ($("#lobby-content").height() + 100)+"px");
            $(".hack").css('width' , $("#lobby-content").width()+"px");
            $("#lobby-content").show();

            break;
        case "main" :
        $(".tables-container").css('top', '96px');
            self.lobby_main.createMain();
            self.lobby_main.makeHotTables(self.hot_live_games);
            self.lobby_main.visible = true


            $(".hack").css('height', ($("#lobby-content").height() + 100)+"px");
            $(".hack").css('width' , $("#lobby-content").width()+"px");
             $("#lobby-content").show();

            break;
        case "sub_baccarat" :
            current_open = param;
            baccaratTables = sortData(baccaratTables, 'normal');

            if(!self.is_mobile) {
                self.lobby_baccaratTables.makeThumbnailTables(baccaratTables, self.lobby_baccaratTables.thumbnail_view, self.lobby_baccaratTables.all_thumbnial_table );
            } else {
                self.lobby_baccaratTables.makeBaccaratTables(baccaratTables);
            }

            $(".hack").css('height', ($("#lobby-content").height() + 100)+"px");
            $(".hack").css('width' , $("#lobby-content").width()+"px")
            break;
        case "sub_poker":
            current_open = param;
            pokerTables = sortData(pokerTables, 'normal');
            self.lobby_pokerTables.makePokerTables(pokerTables);

            $(".hack").css('height', ($("#lobby-content").height())+"px");
            $(".hack").css('width' , $("#lobby-content").width()+"px")
            break;
        case "sub_sicbo" :
            current_open = param;
            self.lobby_sicboTables.makeSicboTables(sicboTables);

            $(".hack").css('height', ($("#lobby-content").height())+"px");
            $(".hack").css('width' , $("#lobby-content").width()+"px")
            break;
        case "sub_dragonTiger" :
            current_open = param;
            dragontigerTables = sortData(dragontigerTables, '', false);

            self.lobby_dragonTigerTables.makeDtTables(dragontigerTables);

            $(".hack").css('height', ($("#lobby-content").height() + 100)+"px");
            $(".hack").css('width' , $("#lobby-content").width()+"px")
            break;
        case "sub_supersix" :
            current_open = param;
            baccaratSuper6Tables = sortData(baccaratSuper6Tables, 'normal');
            self.lobby_baccaratTables.makeBaccaratTables(baccaratSuper6Tables);
            $(".hack").css('height', ($("#lobby-content").height() + 100)+"px");
            $(".hack").css('width' , $("#lobby-content").width()+"px")
            break;
        case "sub_bonus" :
            baccaratBonusTables = sortData(baccaratBonusTables, 'normal');
            self.lobby_baccaratTables.makeBaccaratTables(baccaratBonusTables);
            $(".hack").css('height', ($("#lobby-content").height() + 100)+"px");
            $(".hack").css('width' , $("#lobby-content").width()+"px")
            break;

        case "list" :
            if(current_open == "sub_baccarat") {
                baccaratTables = sortData(baccaratTables, 'normal');
                self.lobby_baccaratTables.makeBaccaratTables(baccaratTables);
                self.lobby_baccaratTables.list_view.visible = true
            }
            else if (current_open == "sub_supersix") {
                baccaratSuper6Tables = sortData(baccaratSuper6Tables, 'normal');
                self.lobby_baccaratTables.makeBaccaratTables(baccaratSuper6Tables);
                self.lobby_baccaratTables.list_view.visible = true;
            }
            else if (current_open == "sub_bonus") {
                baccaratBonusTables = sortData(baccaratBonusTables, 'normal');
                self.lobby_baccaratTables.makeBaccaratTables(baccaratBonusTables);
                self.lobby_baccaratTables.list_view.visible = true;
            }
            else if(current_open == "live_games"  || current_open == "sub_allGames") {
                self.lobby_liveGames.makeListTables(all_tables, self.lobby_liveGames.list_view, self.lobby_liveGames.all_list_table); //set all games data
                self.lobby_liveGames.list_view.visible = true
            }

                $(".hack").css('height', ($("#lobby-content").height() + 100)+"px");
                $(".hack").css('width' , $("#lobby-content").width()+"px")

            break;
        case "thumbnail" :
            if(current_open == "sub_baccarat") {
                baccaratTables = sortData(baccaratTables, 'normal');
                if(!self.is_mobile) {
                    self.lobby_baccaratTables.makeThumbnailTables(baccaratTables, self.lobby_baccaratTables.thumbnail_view, self.lobby_baccaratTables.all_thumbnial_table );
                }
                self.lobby_baccaratTables.thumbnail_view.visible = true
            }

            if(current_open == "live_games" || current_open == "sub_allGames") {
               if(!self.is_mobile) {
                    self.lobby_liveGames.makeThumbnailTables(all_tables, self.lobby_liveGames.thumbnail_view, self.lobby_liveGames.all_thumbnial_table); //set all games data thumbnail
                    // self.lobby_liveGames.thumbnail_view.scrollprop = _.clone(self.lobby_scrollbar.scrollable(self.lobby_liveGames, self.lobby_liveGames.thumbnail_view, 1680, 900));
                }
                self.lobby_liveGames.thumbnail_view.visible = true
            }
    } //end switch

    last_clicked  = param;
};


export default {
    listen,
    someCallback
}
