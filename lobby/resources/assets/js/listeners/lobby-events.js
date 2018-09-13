import Xpacket from '../lib/XPacket';

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
    var socket = io.connect(window.socket+'all', {
        transports: ['websocket']
    });
    // var socket = io.connect('http://13.114.68.215/all', {'transports' : ['websocket']});

    socket.on("push", (data)=>{
        let data_res = Xpacket.received(data)
        switch(data_res.eventName) {
            case "maintenanceChange" :
                setMaintenance(data_res)
                break;
        }
    });

    socket.emit('register', {
        id: window.userId
    });

    socket.on("data", (data)=>{
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
                        self.lobby_main.setAnnouncement(data_res.data[0].mainNotice);
                        self.lobby_banner.setAnnouncement(data_res.data[0].mainNotice);
                    }
                    break;
            }
        }, 1000)

    });

    let setNotice = function(data) {
        self.lobby_main.setAnnouncement(data.data);
        if (self.lobby_banner) {
            self.lobby_banner.setAnnouncement(data.data);
        }

        window.all_tables.forEach((e, x)=>{
            e.mainNotice = data.data;
        });
    }

    let updatecredits = (data) => {
        let user_money = 0;

        if (data.payload.credits.money) {
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
            let money = (window.casino == 'SS') ? parseFloat(data.payload.credits.money).toFixed(2) : parseInt(data.payload.credits.money);
            $(".userinfo-dtl__holdings").html(self.lobby_win_popup.numberWithCommas(currency + money))
            self.lobby_header.user_money = money;
        }

        if (data.payload.credits.total_winning) {
            if (!self.is_mobile) {
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

                self.lobby_win_popup.animatePopup(`${gameText} #${data.tableId}`, parseInt(data.payload.credits.total_winning));
                self.lobby_win_popupgame.animatePopup(`${gameText} #${data.tableId}`, parseInt(data.payload.credits.total_winning));
            }
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
        $.post(`/getChangeDealerImg`, {dealerId : data.dealerId}, (response) => {
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

            if (self.lobby_liveGames.all_thumbnial_table.length) {
                self.lobby_liveGames.all_thumbnial_table.forEach((e, x)=>{
                    if(e.game_name != data.gameName || parseInt(e.table_number) != parseInt(data.tableId)) {
                        return;
                    }

                    let dbImage = new Image();
                    dbImage.src = response[0].dealer_image;
                    e.dealer_image.image = dbImage;
                    e.dealer_name.text = data.dealerName;
                    e.dealer_id = response[0].id;
                });
            }
        });
    }

    let displaymodify = (data) =>{
        window.all_tables.forEach((row)=>{
            if(row.tableNumber == data.tableId && row.gameName == data.gameName) {
                row.is_shoeChange = false;

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

        if(!self.is_mobile) {
            self.lobby_banner.setResult(all_tables, data.gameName, data.tableId, data.meta); //data.meta
        }

        // Main Lobby
        for(var x = 0; x < self.hot_live_games.length; x++) {
            if((data.gameName+"/"+data.tableId) == self.hot_live_games[x].namespace) {
                self.lobby_main.makeRoadmap(self.hot_live_games[x], x)
            }
        }
    }

    $("#shoechangeDT").on("click", () =>{
        shoechange({tableId : 1, gameName : 'Dragon-Tiger'})
        shoechange({tableId : 2, gameName : 'Dragon-Tiger'})
    })
    $("#shoechangeBC").on("click", () =>{
        shoechange({tableId : 3, gameName : 'Baccarat'})
    })

    // setTimeout(() => {
    //     shoechange({tableId : 1, gameName : 'Dragon-Tiger'})
    // },10000)


    // setTimeout(() => {
    //     shoechange({tableId : 2, gameName : 'Baccarat'})
    // },18000)

    let shoechange = (data) =>{
        //** shoe change banner

       window.all_tables.forEach((row)=>{
            if(row.tableNumber == data.tableId && row.gameName == data.gameName) {
                row.marks = [];
                row.is_shoeChange = true;
            }
        });

       self.lobby_main.tables.forEach((table)=>{
            if(table.namespace == data.gameName+"/"+data.tableId) {
                table.roadmap_container.removeAllChildren();
            }
       });

       if(self.lobby_liveGames.all_list_table.length) {

            self.lobby_liveGames.all_list_table.forEach((e, x)=>{
                if(e.game_name == data.gameName && e.table_number == data.tableId) {

                    if(e.card_result_container && e.card_result_container.children.length) {
                        e.card_result_container.removeAllChildren();
                    }

                    try {
                        e.banker_percent.text = '0%';
                        e.player_percent.text = '0%';
                        e.deal_count.text = 0;

                        e.player_total_text.text = 0;
                        e.playerpair_total_text.text = 0;
                        e.playernatural_total_text.text = 0;
                        // ===  banker total texts
                        e.bankernautral_total_text.text = 0;
                        e.bankerpair_total_text.text = 0;
                        e.banker_total_text.text = 0;
                        e.tie_total_text.text = 0;

                        e.status.text = window.language.prompts.promptshuffling
                        e.bigroad_container.removeAllChildren();
                        e.pearlroad_container.removeAllChildren();
                        e.bigeyeboy_container.removeAllChildren();
                        e.small_container.removeAllChildren();
                        e.cockroach_container.removeAllChildren();
                    } catch(err) {

                    }

                    if(e.game_name != "Baccarat") {
                        e.cockroachroad_container.removeAllChildren();
                        e.smallroad_container.removeAllChildren();
                    }
                }
            });
       }

       if(self.lobby_dragonTigerTables.all_list_table.length) {

            self.lobby_dragonTigerTables.all_list_table.forEach((e, x)=>{
                if(e.game_name == data.gameName && e.table_number == data.tableId) {

                    if(e.card_result_container && e.card_result_container.children.length) {
                        e.card_result_container.removeAllChildren();
                    }

                    try {

                        e.status.text = window.language.prompts.promptshuffling
                        e.bigroad_container.removeAllChildren();
                        e.pearlroad_container.removeAllChildren();
                        e.bigeyeboy_container.removeAllChildren();

                        e.tie_count.text = 0;
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
                    } catch(err) {

                    }

                    if(e.game_name != "Baccarat") {
                        e.cockroachroad_container.removeAllChildren();
                        e.smallroad_container.removeAllChildren();
                    }
                }
            });
       }

       if(self.lobby_liveGames.all_thumbnial_table.length) {

            self.lobby_liveGames.all_thumbnial_table.forEach((e, x)=>{
                if(e.game_name == data.gameName  && e.table_number == data.tableId) {
                    e.bigroad_container.removeAllChildren();
                    e.status.text = window.language.prompts.promptshuffling
                }
            });
       }


       if(self.lobby_baccaratTables.all_thumbnial_table.length) {

            self.lobby_baccaratTables.all_thumbnial_table.forEach((e, x)=>{
                if(e.game_name == data.gameName  && e.table_number == data.tableId) {
                    e.bigroad_container.removeAllChildren();
                    e.status.text = window.language.prompts.promptshuffling
                }
            });
       }


       if(self.lobby_baccaratTables.all_list_table.length) {

            self.lobby_baccaratTables.all_list_table.forEach((e, x)=>{
                if(e.game_name == data.gameName  && e.table_number == data.tableId) {
                    // e.bigroad_container.removeAllChildren();
                    e.bigroad_container.removeAllChildren();
                    e.pearlroad_container.removeAllChildren();
                    e.bigeyeboy_container.removeAllChildren();
                    e.small_container.removeAllChildren();
                    e.cockroach_container.removeAllChildren();

                    e.banker_percent.text = '0%';
                    e.player_percent.text = '0%';
                    e.deal_count.text = 0;

                    e.player_total_text.text = 0;
                    e.playerpair_total_text.text = 0;
                    e.playernatural_total_text.text = 0;
                    // ===  banker total texts
                    e.bankernautral_total_text.text = 0;
                    e.bankerpair_total_text.text = 0;
                    e.banker_total_text.text = 0;
                    e.tie_total_text.text = 0;
                    e.deal_count.text = 0;
                    e.status.text = window.language.prompts.promptshuffling

                    if(e.card_result_container && e.card_result_container.children.length) {
                        e.card_result_container.removeAllChildren();
                    }
                }
            });
       }


        if(!self.mobile) {
            if(!self.lobby_banner.currentSelected) return;
            if(self.lobby_banner.currentSelected != data.gameName +"/"+data.tableId) return;

            if(data.gameName == "Baccarat") {
                self.lobby_banner.bigeyeboy_container.removeAllChildren()
                self.lobby_banner.small_container.removeAllChildren()
                self.lobby_banner.cockroach_container.removeAllChildren()
                self.lobby_banner.cockroach_container.removeAllChildren()
                self.lobby_banner.bigRoad_container.removeAllChildren()
                self.lobby_banner.pearlRoad_container.removeAllChildren()

                self.lobby_banner.player_val.text = 0
                self.lobby_banner.tie_val.text = 0
                self.lobby_banner.banker_val.text = 0
                self.lobby_banner.player_count.text = 0

                self.lobby_banner.playerpair_count.text = 0

                self.lobby_banner.playernatural_count.text = 0

                self.lobby_banner.banker_count.text = 0

                self.lobby_banner.bankerpair_count.text = 0

                self.lobby_banner.bankernatural_count.text = 0

                self.lobby_banner.tie_count.text = 0;

                self.lobby_banner.player_bar.scaleX = 1
                self.lobby_banner.tie_bar.scaleX = 0
                self.lobby_banner.banker_bar.scaleX = 0

                self.lobby_banner.deal_count.text = 0
            }

            if(data.gameName == "Dragon-Tiger") {

                self.lobby_banner.dragon_bar.scaleX = 1
                self.lobby_banner.tie_bar.scaleX = 0
                self.lobby_banner.tiger_bar.scaleX = 0

                self.lobby_banner.deal_count.text = 0
                self.lobby_banner.dragon_val.text = 0;
                self.lobby_banner.tie_val.text = 0;
                self.lobby_banner.tiger_val.text = 0;
                self.lobby_banner.dragon_count.text = 0;
                self.lobby_banner.dragon_big_count.text = 0;
                self.lobby_banner.dragon_small_count.text = 0;
                self.lobby_banner.tiger_count.text = 0;
                self.lobby_banner.tiger_big_count.text = 0;
                self.lobby_banner.tiger_small_count.text = 0;
                self.lobby_banner.tie_count.text = 0;

                self.lobby_banner.dt_pearlRoad_container.removeAllChildren()
                self.lobby_banner.dt_bigroad_container.removeAllChildren()
                self.lobby_banner.dt_bigeyeboy_container.removeAllChildren()
                self.lobby_banner.dt_smallroad_container.removeAllChildren()
                self.lobby_banner.dt_cockroachroad_container.removeAllChildren()
            }
        }

    } // end shoechange

    self.initTable = function () {

        let game = ["Poker/1", "Sicbo/1", "Baccarat/1","Dragon-Tiger/1"];

        // window.all_tables.forEach((e)=> {
        // if(self.hot_live_games.length == 4) return;
        //     for(var x = 0; x < game.length; x++) {
        //         if(e.namespace == game[x]) {
        //             self.hot_live_games.push(e)
        //         }
        //     }
        // });

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
        self.lobby_main.makeHotTables(self.hot_live_games);
        self.lobby_hotGamesSideBar.createHotGames(self.hot_live_games);

        //== baccarat tables
        baccaratTables = _.filter(all_tables, function(row) { return row.gameName == "Baccarat" && (!row.slave || !row.slave.length) });
        baccaratSuper6Tables = _.filter(all_tables, function(row) { return row.gameName == "Baccarat" && row.slave == 'supersix' });
        baccaratBonusTables = _.filter(all_tables, function(row) { return row.gameName == "Baccarat" && row.slave == 'bonus' });

        //set sicbo games data
        sicboTables = _.filter(all_tables, function(row) { return row.gameName == "Sicbo" });
        // === dragontiger
        dragontigerTables = _.filter(all_tables, function(row) { return row.gameName == "Dragon-Tiger"  });
        // === poker
        pokerTables = _.filter(all_tables, function(row) { return row.gameName == "Poker"  });
        $("#hot").show()
        $(".hot-container").show();

        if(current_open && current_open != "main") {
            $("#hot").hide()
            $(".hot-container").hide();
        }

        if(current_open) {
            try {
                toggle(current_open)
            } catch(err) {

            }
        }

        //for dom

        let h_games_clone = _.clone(self.hot_live_games);
         h_games_clone.push({
            gameName : "kagaming"
        })
        h_games_clone.push({
            gameName : "betsoft"
        })

        for(var x = 0; x < h_games_clone.length; x++) {
            let image = "";
            let text = "";
            let data = ""
            if(h_games_clone[x].gameName == "Baccarat") {
                image = "/img/sidebar/hotgames/baccarat-hotgame.png";
                text = window.language.lobby.baccaratcaps;
                data = "sub_baccarat";


            }
            if(h_games_clone[x].gameName == "Dragon-Tiger") {
                image = "/img/sidebar/hotgames/dragontiger-hotgame.png"
                text = window.language.lobby.dragontigercaps;
                data = "sub_dragonTiger";
            }
            if(h_games_clone[x].gameName == "Poker") {
                image = "/img/sidebar/hotgames/poker-hotgame.png"
                text = window.language.lobby.poker.toUpperCase();
                data = "sub_poker";
            }
            if(h_games_clone[x].gameName == "Sicbo") {
                image = "/img/sidebar/hotgames/sicbo-hotgame.png"
                text = window.language.lobby.sicbocaps;
                data = "sub_sicbo";
            }

            if(h_games_clone[x].gameName == 'betsoft') {
                if(window.language.locale == "zh") {
                    image = "/img/sidebar/hotgames/betsoft-hotgame-zh.png"
                } else {
                    image = "/img/sidebar/hotgames/betsoft-hotgame.png"
                }

                text = window.language.lobby.betsoftreelcaps;
                data = ""
            }
            if(h_games_clone[x].gameName == 'kagaming') {
                if(window.language.locale == "zh") {
                    image = "/img/sidebar/hotgames/ka-hotgame_zh.png"
                } else {
                    image = "/img/sidebar/hotgames/ka-hotgame-new.png"
                }

                text = window.language.lobby.kagamingreelcaps;
                data = "kagaming";
            }

            $(".hotgame-wrap.clearfix").append(
                "<div class='hotgame__con' data = '"+data+"'>"
                    +"<div class='hotgame__name'><span>"+text+"</span></div>"
                    +"<div class='hotgame__thumbnail'>"
                        +"<div class='hotgame--img-wrap'><img src='"+image+"' alt=''></div>"
                    +"</div>"
                +"</div>"
            )
        }

        $(".hotgame__con, .game__con").on("click", function () {
          reelClicked++;
          if(!$(this).attr("data")) return;
          if($(this).attr("data")=="kagaming") {
            if(!parseInt(window.reel_yn)) return;
          }
          toggle($(this).attr("data"))
          $('.sidebar--lobby').hide();
          $('.sidebar--game, .header-subnav').css({'display': 'block'});
          $('.header-game__items').removeClass('active');

          if($(this).attr("data")=="kagaming") {
            $(".banner-wrapper").hide();
            $('#reelgames').addClass('active');
            $('.header-subnav').css({'display': 'none'});
            $('.header-subnav.reelgames').css({'display': 'block'});
          } else {
            $('#livegames').addClass('active');
            $('.header-subnav.reelgames').css({'display': 'none'});
          }
        })

    }

    if(self.data_flag) {
        self.initTable();
    }

    let setMaintenance = function (data) {
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

        //== baccarat tables
        baccaratTables = _.filter(all_tables, function(row) { return row.gameName == "Baccarat" && (!row.slave || !row.slave.length) });
        baccaratSuper6Tables = _.filter(all_tables, function(row) { return row.gameName == "Baccarat" && row.slave == 'supersix' });
        baccaratBonusTables = _.filter(all_tables, function(row) { return row.gameName == "Baccarat" && row.slave == 'bonus' });

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

            if(self.lobby_main.hot_games_container) {
                self.lobby_main.makeHotTables(self.hot_live_games)
            }
        }

        if(self.lobby_banner.currentSelected ==  data.gameName +"/"+ data.tableId) {
            self.lobby_banner.banner_container.visible = true;
            self.lobby_banner.table_banner_container.visible = false;
            self.lobby_banner.userBased_banner_container.visible = false;

            self.lobby_liveGames.all_list_table.forEach((e, x)=>{
                if(e.game_name == self.lobby_banner.currentSelected.split("/")[0]  && e.table_number == self.lobby_banner.currentSelected.split("/")[1]) {
                    e.view.children[1].gotoAndStop(0);
                    e.clicked = false;
                }
            });

            self.lobby_banner.currentSelected = null;
        }

        self.lobby_liveGames.all_list_table.forEach((e, x)=>{
            if(e.game_name != data.gameName || e.table_number != data.tableId) {
                return;
            }

            if (data.gameName == 'Baccarat' || data.gameName == 'Sicbo' || data.gameName == 'Poker' || data.gameName == 'Dragon-Tiger') {
              self.lobby_liveGames.setMaintenance(data, x);
            }
        });

        self.lobby_liveGames.all_thumbnial_table.forEach((e, x)=>{
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


        self.lobby_baccaratTables.all_thumbnial_table.forEach((e, x)=>{
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

        self.lobby_pokerTables.all_list_table.forEach((e, x)=>{
            if(e.game_name != data.gameName || e.table_number != data.tableId) {
                return;
            }

            if (data.gameName == 'Poker') {
              self.lobby_pokerTables.setMaintenance(data, x);
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

        let listState = false;
        if(current_state == "list") {
            listState = true;
        }
        if(current_open) {
            if(current_open == "sub_allGames") {
                toggle("live_games")
            } else {
                toggle(current_open)
            }
        }

        if(current_state) {
            if(current_open != "main")
            toggle(listState ? "list" : "thumbnail")
        }
    }

    let setResult =  function(data) {
        console.log("sample result data", data)
        all_tables.forEach( function(e,x) {
            switch(`${e.gameName} ${data.gameName} ${data.tableId}` ) {
                case "Sicbo Sicbo "+e.tableNumber :
                    e.marks.shift()
                    e.marks.push(data.mark);
                    break;
                case "Baccarat Baccarat "+e.tableNumber :
                    e.roundStatus = 'R';
                    if(parseInt(data.tableId) != parseInt(e.tableNumber)) return;

                    if (e.slave == 'supersix' || e.slave == 'bonus') {
                        for (var i = 0; i < all_tables.length; i++) {
                            if (`${data.gameName}${data.tableId}` === `${all_tables[i].gameName}${all_tables[i].tableNumber}`) {
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
            } // end switch
        });

        for(var x = 0; x < self.hot_live_games.length; x++) {

            if((data.gameName+"/"+data.tableId) == self.hot_live_games[x].namespace) {
                self.lobby_main.makeRoadmap(self.hot_live_games[x], x)
            }
        }

        baccaratTables = _.filter(all_tables, function(row) { return row.gameName == "Baccarat" && (!row.slave || !row.slave.length) });
        baccaratSuper6Tables = _.filter(all_tables, function(row) { return row.gameName == "Baccarat" && row.slave == 'supersix' });
        baccaratBonusTables = _.filter(all_tables, function(row) { return row.gameName == "Baccarat" && row.slave == 'bonus' });

        baccaratTables = sortData(baccaratTables, 'normal');
        baccaratBonusTables = sortData(baccaratBonusTables, 'bonus');
        baccaratSuper6Tables = sortData(baccaratSuper6Tables, 'supersix');
        dragontigerTables = sortData(dragontigerTables, '', false);

        self.lobby_liveGames.setResult(baccaratTables, data.gameName, data.tableId, data.meta);

        if(!self.is_mobile) {
            if(current_open == "sub_supersix") {
                self.lobby_banner.setResult(baccaratSuper6Tables, data.gameName, data.tableId, data.meta);
            } else if(current_open == "sub_bonus") {
                console.log("tables on result:: bonus bc",baccaratBonusTables)
                self.lobby_banner.setResult(baccaratBonusTables, data.gameName, data.tableId, data.meta);
            } else {
                self.lobby_banner.setResult(baccaratTables, data.gameName, data.tableId, data.meta);
            }
            // self.lobby_banner.setResult(baccaratTables, data.gameName, data.tableId, data.meta);
        }

        switch (data.gameName) {
            case "Sicbo" :
                self.lobby_sicboTables.setResult(sicboTables, data.gameName, data.tableId);
                break;
            case "Baccarat" :
                if(current_open == "sub_supersix") {
                    self.lobby_baccaratTables.setResult(baccaratSuper6Tables, data.gameName, data.tableId);
                }
                else if (current_open == 'sub_bonus') {
                    self.lobby_baccaratTables.setResult(baccaratBonusTables, data.gameName, data.tableId);
                }
                else {
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
    }

    let dt_card_info = {'burn': null, 'tiger': null, 'dragon' : null};
    let setCardSwipe = function (data) {
        if(data.gameName == "Sicbo") return;

        window.all_tables.forEach((table)=>{
            if(table.gameName == data.gameName && table.tableNumber == data.tableId ) {
                table.roundStatus = 'P';
                if(table.gameName != "Dragon-Tiger") {
                    table.gameInfo = data.gameInfo
                } else if(table.gameName == "Dragon-Tiger") {
                    dt_card_info[data.type] = data.value;
                    table.gameInfo = _.pickBy(data.gameInfo, (value, key)=>{ return value; });
                }
            }
        });

        if(current_open == "sub_supersix") {
            self.lobby_liveGames.inputResult(baccaratSuper6Tables,data);
        } else {
            self.lobby_liveGames.inputResult(baccaratTables,data);
        }

        switch  (data.gameName) {
            case "Baccarat" :
            case "baccarat" :
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
                self.lobby_dragonTigerTables.inputResult(dragontigerTables,data);
                break;
            case "Poker" :
                // console.log(data,"swipeswiopeeeeeee")
                self.lobby_pokerTables.inputResult(pokerTables,data);
                // console.log(pokerTables,"swipeswiopeeeeeee")
                if(!self.is_mobile) {
                    self.lobby_banner.inputResult(pokerTables, data);
                }
                break;
        }

        if(!self.is_mobile) {
            if(self.lobby_banner.currentSelected) {
                if(data.gameName =="Baccarat" || data.gameName =="Dragon-Tiger"|| data.gameName =="Poker") {
                    if(self.lobby_banner.currentSelected == `${data.gameName}/${data.tableId}`) {
                        self.lobby_banner.gameStatus.text = window.language.lobby.dealing;
                    }
                }
            }
        }
    }

    let setNewRound = function(data) {

        window.all_tables.forEach((table)=>{
            if(table.gameName == data.gameName && table.tableNumber == data.tableId) {

                table.is_shoeChange = false;

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

        if(!self.is_mobile) {
            if(self.lobby_banner.currentSelected) {
                self.lobby_banner.setNewround(all_tables, data.gameName, data.tableId, data.meta);
                if(self.lobby_banner.currentSelected == data.gameName+"/"+data.tableId) {
                    if(self.lobby_banner.card_result_container) {
                        self.lobby_banner.card_result_container.removeAllChildren();
                    }
                }
            }
        }

        self.lobby_liveGames.all_list_table.forEach((e, x)=>{
            if(e.game_name != data.gameName || e.table_number != data.tableId) {
                return;
            }
            // console.log("aldkadiddaioudiduoasidusd",data, e)
            e.round_num.text = data.roundNum;

            if(e.card_result_container) {
                e.card_result_container.removeAllChildren();
            }
        });

        if(!self.is_mobile) {
            self.lobby_liveGames.all_thumbnial_table.forEach((e, x)=>{
                if(e.game_name != data.gameName || e.table_number != data.tableId) {
                    return;
                }

                if(e.game_name == "Poker") {
                    if(e.card_result_container) {
                        e.card_result_container.removeAllChildren();
                        e.card_res_bg_container.visible = false;
                    }
                }
            });
        }

        // === sicbo
        self.lobby_sicboTables.all_list_table.forEach((e, x)=>{
           if(e.game_name != data.gameName || e.table_number != data.tableId) {
                return;
            }
            e.round_num.text = data.roundNum;
        });

        // === baccarat
        self.lobby_baccaratTables.all_list_table.forEach((e, x)=>{
             if(e.game_name != data.gameName || e.table_number != data.tableId) {
                return;
            }
            e.round_num.text = data.roundNum;

            if(e.card_result_container) {
                e.card_result_container.removeAllChildren();
            }
        });

        // === dragontiger
        self.lobby_dragonTigerTables.all_list_table.forEach((e, x)=>{
             if(e.game_name != data.gameName || e.table_number != data.tableId) {
                return;
            }
            e.round_num.text = data.roundNum;

            if(e.card_result_container) {
                e.card_result_container.removeAllChildren();
            }
        });

         // === poker
        // if(self.lobby_pokerTables.all_list_table.length) {

            self.lobby_pokerTables.all_list_table.forEach((e, x)=>{
                 if(e.game_name != data.gameName || e.table_number != data.tableId) {
                    return;
                }
                e.round_num.text = data.roundNum;

                if(e.card_result_container) {
                    e.card_result_container.removeAllChildren();
                }
            });
        // }

        if(self.lobby_pokerTables.all_thumbnial_table.length) {
            self.lobby_pokerTables.all_thumbnial_table.forEach((e, x)=>{
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
        if(!self.is_mobile) {
            if(self.lobby_banner.currentSelected) {

                if(data.eventName =="stoptimer" || data.eventName =="setroundprogress") {
                    self.lobby_banner.setroundprogress(all_tables, data.gameName, data.tableId, data.meta);
                }
            }
        }

        if(self.lobby_liveGames.all_list_table.length) {
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


        if(!self.is_mobile) {
            if(self.lobby_liveGames.all_thumbnial_table.length) {
                self.lobby_liveGames.all_thumbnial_table.forEach((e, x)=>{
                    if(e.game_name != data.gameName || e.table_number != data.tableId) {
                        return;
                    }
                    if(data.eventName =="stoptimer" || data.eventName =="setroundprogress") {
                        data.bettingTime = 0
                    }
                    timer(e,data);
                });
            }

            if(self.lobby_baccaratTables.all_thumbnial_table.length) {
                self.lobby_baccaratTables.all_thumbnial_table.forEach((e, x)=>{
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

        // === baccarat
        if(self.lobby_baccaratTables.all_list_table.length) {
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
        if(self.lobby_sicboTables.all_list_table.length) {
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
        if(self.lobby_dragonTigerTables.all_list_table.length) {
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
        if(self.lobby_pokerTables.all_list_table.length) {
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
            data.roundStatus = "E";
            if(data.gameName == "Poker") {
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

                e.status.text = status; //data.type  == "startround" ?  window.language.lobby.nowbetting : "Bet " + data.type

                if(self.lobby_banner.currentSelected == (data.gameName+"/"+data.tableId)) {
                    let status_text = "";
                    if(data.type == "startround") {
                        status_text = window.language.lobby.nowbetting
                    } else if(data.type == "flop") {
                        status_text = window.language.poker.betflop
                    } else if(data.type == "turn") {
                        status_text = window.language.poker.betturn
                    } else if(data.type == "river") {
                        status_text = window.language.poker.betriver
                    }
                    e.status.text = status_text;
                    self.lobby_banner.gameStatus.text = status_text
                }
            }
        }

        if(data.bettingTime == 0) { // hiding bet time
            e.timer.visible = false
            e.status.text = window.language.lobby.bettingend;
            e.is_timerStart = false;
            if(self.lobby_banner.currentSelected == (data.gameName+"/"+data.tableId)) {
                self.lobby_banner.gameStatus.text = window.language.lobby.bettingend
            }
        }
    }
}

let current_open = "";
let current_state = "";

const someCallback = (param, self) => {
    if(!param) return;

    if((param == "thumbnail" || param == "list") && (current_open == "sub_sicbo" || current_open == "sub_poker"|| current_open == "sub_dragonTiger" || current_open == "kagaming")) return;

    if(param == "action_logout" || param == "thumbnail_transactions" || param == "thumbnail_bethistory" || param == "thumbnail_howtoplay" || param == "thumbnail_settings") {
        return;
    }

    let hideComponents = () => {
      $(".banner-wrapper").show()
      $(".main-container").show().css({'top': '30%'})
      $(".canvas-container").removeClass("kaga")
      $(".main-container").removeClass("fixed")
      $(".kaga-container").hide();

        self.lobby_reelGames.removeAllChildren();
        self.lobby_main.removeAllChildren();

        self.lobby_liveGames.list_view.removeAllChildren()
        if(!self.is_mobile) {
            self.lobby_liveGames.thumbnail_view.removeAllChildren()
            self.lobby_baccaratTables.thumbnail_view.removeAllChildren();
        }

        self.lobby_baccaratTables.list_view.removeAllChildren();

        self.lobby_pokerTables.list_view.removeAllChildren();
        self.lobby_sicboTables.list_view.removeAllChildren();
        self.lobby_dragonTigerTables.list_view.removeAllChildren();

        if(!self.is_mobile) {
          if(self.lobby_baccaratTables.list_view) {
            // self.lobby_scrollbar.togglescrollable(self.lobby_baccaratTables.list_view, false);
          }
          if(self.lobby_liveGames.list_view) {
            // self.lobby_scrollbar.togglescrollable(self.lobby_liveGames.list_view, false);
          }
          if(self.lobby_liveGames.thumbnail_view) {
            // self.lobby_scrollbar.togglescrollable(self.lobby_liveGames.thumbnail_view, false);
          }
        }

    }

    hideComponents();

    $(".canvas-container").addClass(window.theme+"-theme")
    switch (param) {
        case "reel_games" :
            current_state = "thumbnail"
                $(".main-container").css({'top': '10%'})
                $(".canvas-container").addClass("kaga")
                $(".main-container").addClass("fixed").show();

                self.lobby_reelGames.createReelGames();
                $(".canvas-container").addClass("kaga")
                $(".main-container").addClass("fixed")
            break;
        case "kagaming":
                self.lobby_reelGames.toggleView("kagaming");
                $(".hot-container, .main-container, .banner-wrapper").hide();
                $(".kaga-container").show().css({'overflow' : 'auto'});
                $(".canvas-container").addClass("kaga")
            break;
        case "live_games" :
            current_state = "thumbnail"
            current_open = param;
                $(".main-container").show();
                baccaratTables = sortData(baccaratTables, 'normal');

                self.lobby_liveGames.makeThumbnailTables(baccaratTables, self.lobby_liveGames.thumbnail_view, self.lobby_liveGames.all_thumbnial_table); //set all games data thumbnail
                self.lobby_liveGames.thumbnail_view.visible = true
                // self.lobby_scrollbar.togglescrollable(self.lobby_liveGames.thumbnail_view, true);
                // self.context.stage.canvas.height = !self.lobby_liveGames.getBounds() ? 500 : self.lobby_liveGames.getBounds().height;
            break;

        case "sub_allGames":
            current_state = "thumbnail"
            current_open = param;
                $(".main-container").show();

                self.lobby_liveGames.makeThumbnailTables(all_tables, self.lobby_liveGames.thumbnail_view, self.lobby_liveGames.all_thumbnial_table); //set all games data thumbnail
                self.lobby_liveGames.thumbnail_view.visible = true
                // self.context.stage.canvas.height = !self.lobby_liveGames.getBounds() ? 500 : self.lobby_liveGames.getBounds().height;
            break;
        case "main" :
            current_state = "thumbnail"
            current_open = "main"
            self.lobby_main.createMain();
            self.lobby_main.makeHotTables(self.hot_live_games);
            $(".canvas-container").removeClass(window.theme+"-theme")
            $('.header-subnav__items').removeClass("active")
            $('.header-subnav__items#allgames').addClass("active")
            $("#lobby").next().children().removeClass("active");
            $('.sidebar--lobby').show();
            $('.sidebar').css({'width': '560px'});
            $('.sidebar--game, .header-subnav').css({'display': 'none'});
            $('.sidebar--lobby').css({'display' : 'block'});
            // self.context.stage.canvas.height = !self.lobby_main.getBounds() ? 500 : self.lobby_main.getBounds().height;
            // console.log(self.lobby_main.getBounds(), "height bounds lobby")
            break;
        case "sub_baccarat" :
            current_open = param;
            current_state = "thumbnail"
            baccaratTables = sortData(baccaratTables, 'normal');

            self.lobby_baccaratTables.makeThumbnailTables(baccaratTables, self.lobby_baccaratTables.thumbnail_view, self.lobby_baccaratTables.all_thumbnial_table );
            // self.context.stage.canvas.height = !self.lobby_baccaratTables.getBounds() ? 500 : self.lobby_baccaratTables.getBounds().height;
            break;
        case "sub_poker":
            current_open = param;
            current_state = "thumbnail"
            // pokerTables = sortData(pokerTables, 'normal');

            self.lobby_pokerTables.makePokerTables(pokerTables);
            // self.context.stage.canvas.height = !self.lobby_pokerTables.getBounds() ? 500 : self.lobby_pokerTables.getBounds().height +200;
            break;
        case "sub_sicbo" :
            current_open = param;
            current_state = "thumbnail"
            self.lobby_sicboTables.makeSicboTables(sicboTables);
            // self.context.stage.canvas.height = !self.lobby_sicboTables.getBounds() ? 500 : self.lobby_sicboTables.getBounds().height + 200;
            break;
        case "sub_dragonTiger" :
            current_open = param;
            current_state = "thumbnail"
            dragontigerTables = sortData(dragontigerTables, '', false);

            self.lobby_dragonTigerTables.makeDtTables(dragontigerTables);
            // self.context.stage.canvas.height = !self.lobby_dragonTigerTables.getBounds() ? 500 : self.lobby_dragonTigerTables.getBounds().height + 200;
            break;
        case "sub_supersix" :
            current_open = param;
            current_state = "thumbnail"
            baccaratSuper6Tables = sortData(baccaratSuper6Tables, 'supersix');

            self.lobby_baccaratTables.makeThumbnailTables(baccaratSuper6Tables, self.lobby_baccaratTables.thumbnail_view, self.lobby_baccaratTables.all_thumbnial_table );
            break;
        case "sub_bonus" :
            current_open = param;
            current_state = "thumbnail"
            baccaratBonusTables = sortData(baccaratBonusTables, 'bonus');
            console.log("sorted data bonus::", baccaratBonusTables)
            self.lobby_baccaratTables.makeThumbnailTables(baccaratBonusTables, self.lobby_baccaratTables.thumbnail_view, self.lobby_baccaratTables.all_thumbnial_table );
            break;

        case "list" :
            current_state = "list"
            if(current_open == "sub_baccarat") {
                baccaratTables = sortData(baccaratTables, 'normal');

                self.lobby_baccaratTables.makeBaccaratTables(baccaratTables);
                self.lobby_baccaratTables.list_view.visible = true;
                // self.context.stage.canvas.height = !self.lobby_baccaratTables.getBounds() ? 500 : self.lobby_baccaratTables.getBounds().height;
            }
            else if (current_open == "sub_supersix") {
                baccaratSuper6Tables = sortData(baccaratSuper6Tables, 'supersix');
                self.lobby_baccaratTables.makeBaccaratTables(baccaratSuper6Tables);
                self.lobby_baccaratTables.list_view.visible = true;
            }
            else if (current_open == "sub_bonus") {
                baccaratBonusTables = sortData(baccaratBonusTables, 'bonus');
                self.lobby_baccaratTables.makeBaccaratTables(baccaratBonusTables);
                self.lobby_baccaratTables.list_view.visible = true;
            }
            else if(current_open == "live_games"  || current_open == "sub_allGames") {
                baccaratTables = sortData(baccaratTables, 'normal');

                self.lobby_liveGames.makeListTables(baccaratTables, self.lobby_liveGames.list_view, self.lobby_liveGames.all_list_table); //set all games data
                self.lobby_liveGames.list_view.visible = true
                // self.context.stage.canvas.height = !self.lobby_liveGames.getBounds() ? 500 : self.lobby_liveGames.getBounds().height;
            }
            break;
        case "thumbnail" :
            current_state = "thumbnail"
            if(current_open == "sub_baccarat") {
                baccaratTables = sortData(baccaratTables, 'normal');

                self.lobby_baccaratTables.makeThumbnailTables(baccaratTables, self.lobby_baccaratTables.thumbnail_view, self.lobby_baccaratTables.all_thumbnial_table );
                // self.lobby_baccaratTables.thumbnail_view.visible = true
            }
            else if (current_open == "sub_supersix") {
                baccaratSuper6Tables = sortData(baccaratSuper6Tables, 'supersix');
                self.lobby_baccaratTables.makeThumbnailTables(baccaratSuper6Tables, self.lobby_baccaratTables.thumbnail_view, self.lobby_baccaratTables.all_thumbnial_table );
            }
            else if (current_open == "sub_bonus") {
                baccaratBonusTables = sortData(baccaratBonusTables, 'bonus');
                self.lobby_baccaratTables.makeThumbnailTables(baccaratBonusTables, self.lobby_baccaratTables.thumbnail_view, self.lobby_baccaratTables.all_thumbnial_table );
            }
            else if(current_open == "live_games" || current_open == "sub_allGames") {
                baccaratTables = sortData(baccaratTables, 'normal');
                self.lobby_liveGames.makeThumbnailTables(baccaratTables, self.lobby_liveGames.thumbnail_view, self.lobby_liveGames.all_thumbnial_table); //set all games data thumbnail
                self.lobby_liveGames.thumbnail_view.visible = true
                // self.context.lobby_liveGames.canvas.height = !self.lobby_liveGames.getBounds() ? 500 : self.lobby_liveGames.getBounds().height + 200;
            }
            break;
        }



    _global.toggleHeight = (param)  => {
        var baseWidth = 1920, baseHeight = 1080,
        newWidth = window.innerWidth, newHeight = window.innerHeight;

        let height = 0;
        let offsettop = 0;

        let numrows = 0;
        switch(param) {
            case "reel_games":
              height = 1020
              break;
              case "kagaming":
                height = 1020
              break;
            case "main":
                height = 1040;
                mainStage.y = 0;
                break;
            case "live_games" :
                numrows = parseInt ((baccaratTables.length/4) + ((baccaratTables.length%4) ? 1 : 0))
                height = (numrows) * (220 + (10*numrows) - 20) //940 + 0;
                // mainStage.y = offsettop;
                break
            case "list" :
                if(current_open == "live_games") {
                    numrows = parseInt(baccaratTables.length)
                    height = ((numrows) * (302.5) - 20) //940 + 0;
                }

                if(current_open == "sub_baccarat") {
                    // height = (baccaratTables.length) *310;

                    numrows = parseInt ((baccaratTables.length))
                    height = (numrows) * (302.5) //940 + 0;
                }
                else if(current_open == "sub_supersix") {
                    numrows = parseInt ((baccaratSuper6Tables.length))
                    height = (numrows) * (302.5) //940 + 0;
                }
                else if(current_open == "sub_bonus") {
                    numrows = parseInt ((baccaratBonusTables.length))
                    height = (numrows) * (302.5) //940 + 0;
                }
                mainStage.y = offsettop;
                break;
            case "thumbnail":
                mainStage.y = offsettop;
                if(current_open == "live_games") {
                    // height = (all_tables.length/4) *265 //940 + 0;
                    numrows = parseInt ((baccaratTables.length/4) + ((baccaratTables.length%4) ? 1 : 0))
                    height = (numrows) * (220 + (10*numrows) - 20) //940 + 0;
                    mainStage.y = offsettop;
                }

                if(current_open == "sub_baccarat") {
                    // height = (baccaratTables.length/4) *265 //940 + 0;

                    numrows = parseInt ((baccaratTables.length/4) + ((baccaratTables.length%4) ? 1 : 0))
                    height = (numrows) * (220 + (10*numrows) - 20) //(numrows) * (302.5) //940 + 0;
                }
                else if(current_open == "sub_supersix") {
                    numrows = parseInt ((baccaratSuper6Tables.length/4) + ((baccaratSuper6Tables.length%4) ? 1 : 0))
                    height = (numrows) * (220 + (10*numrows) - 20) //940 + 0;
                }
                else if(current_open == "sub_bonus") {
                    numrows = parseInt ((baccaratBonusTables.length/4) + ((baccaratBonusTables.length%4) ? 1 : 0))
                    height = (numrows) * (220 + (10*numrows) - 20) //940 + 0;
                }

                if (current_open == "sub_allGames")  {
                    numrows = parseInt ((baccaratTables.length/4) + ((baccaratTables.length%4) ? 1 : 0))
                    height =  (numrows) * (302.5) //940 + 0;
                }
                break;
            case "sub_baccarat" :
                numrows = parseInt ((baccaratTables.length/4) + ((baccaratTables.length%4) ? 1 : 0))
                height = (numrows) * (220 + (10*numrows) - 20); //940 + 0;
                break;
            case "sub_supersix" :
                numrows = parseInt ((baccaratSuper6Tables.length/4) + ((baccaratSuper6Tables.length%4) ? 1 : 0))
                height = (numrows) * (220 + (10*numrows)) - 20; //940 + 0;
                break;
            case "sub_bonus" :
                numrows = parseInt ((baccaratBonusTables.length/4) + ((baccaratBonusTables.length%4) ? 1 : 0))
                height = (numrows) * (220 + (10*numrows)) - 20; //940 + 0;
                break;
            case "sub_poker" :
                height = (pokerTables.length) *302.5 //940 + 0;
                break;
            case "sub_allGames" :
                numrows = parseInt ((baccaratTables.length/4) + ((baccaratTables.length%4) ? 1 : 0))
                height =  (numrows) * (302.5) //940 + 0;
                break;
            case "sub_sicbo" :
                height = (sicboTables.length) *302.5 //940 + 0;
                break;
            case "sub_dragonTiger" :
                height = (dragontigerTables.length) *302.5 //940 + 0;
                mainStage.y = offsettop;
                break;
        }
        height  = height * parseFloat($(".dom-resizable").attr("style").split("(")[1].split(")")[0])
        self.context.stage.canvas.height = height;
    }

    window.addEventListener("resize", function() {
      _global.toggleHeight(param);
    })

    _global.toggleHeight(param);
};

export default {
    listen,
    someCallback
}
