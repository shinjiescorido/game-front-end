import Xpacket from '../lib/XPacket';

window.all_tables = [];
export default(self) => {
    // var socket = io.connect('http://10.1.10.12:9002/all', { 'transports': ['websocket'] });
    var socket = io.connect('http://52.192.115.210/all');

    socket.on('connect', function (e) {
        // console.log("connected");
    });

    socket.on("push", (data)=>{
        let data_res = Xpacket.received(data)
        // console.log(data_res, data_res.eventName)
        switch(data_res.eventName) {
            case "maintenanceChange" :
                setMaintenance(data_res)
                break;
        }
    });

    socket.on("data", (data)=>{
        let data_res = Xpacket.received(data)
        // console.log(data_res)
        switch(data_res.eventName) {
            case ("init") :
                init(data_res);
                break;
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
        }

    });

    let sicboTables = null;
    let baccaratTables = null;
    let dragontigerTables = null;
    let pokerTables = null;

    let hot_tables_sample = [];

    let init = function(data) {
        window.all_tables = data.data;
        window.all_tables = _.filter(window.all_tables, function (e) { // === filtering data
            if(e.gameName != "Big-Wheel" && e.gameName != "Pula-Puti") {
                return e;
            }
        });

        all_tables = _.sortBy (all_tables, (row) => {
            return row.gameName
        });

        let game = ["Poker/1", "Sicbo/13", "Baccarat/1","Dragon-Tiger/1"];

        all_tables.forEach((e)=> {
            if(hot_tables_sample.length == 4) return;
            for(var x = 0; x < game.length; x++) {
                if(e.namespace == game[x]) {
                    hot_tables_sample.push(e)
                }
            }
        });

        self.lobby_main.makeHotTables(hot_tables_sample);
        // === make all tables
        if(!self.is_mobile) {
            self.lobby_liveGames.makeThumbnailTables(all_tables, self.lobby_liveGames.thumbnail_view, self.lobby_liveGames.all_thumbnial_table); //set all games data thumbnail
        }
        self.lobby_liveGames.makeListTables(all_tables, self.lobby_liveGames.list_view, self.lobby_liveGames.all_list_table); //set all games data

        //== baccarat tables
        baccaratTables = _.filter(all_tables, function(row) { return row.gameName == "Baccarat" });

        if(!self.is_mobile) {
            self.lobby_baccaratTables.makeThumbnailTables(baccaratTables, self.lobby_baccaratTables.thumbnail_view, self.lobby_baccaratTables.all_thumbnial_table );
        }

        self.lobby_baccaratTables.makeBaccaratTables(baccaratTables);

        //set sicbo games data
        sicboTables = _.filter(all_tables, function(row) { return row.gameName == "Sicbo" });
        self.lobby_sicboTables.makeSicboTables(sicboTables);

        // === dragontiger
        dragontigerTables = _.filter(all_tables, function(row) { return row.gameName == "Dragon-Tiger"  });
        self.lobby_dragonTigerTables.makeDtTables(dragontigerTables);

        // === poker
        pokerTables = _.filter(all_tables, function(row) { return row.gameName == "Poker"  });
        self.lobby_pokerTables.makePokerTables(pokerTables);

        // === scroller
        if(!self.is_mobile) {
            self.lobby_liveGames.list_view.setBounds(0,0,1680,self.lobby_liveGames.list_view.getBounds().height + 150);
            self.lobby_baccaratTables.list_view.setBounds(0,0,1680,self.lobby_baccaratTables.list_view.getBounds().height + 150);

            let scrollprop = self.lobby_scrollbar.scrollable(self.lobby_liveGames, self.lobby_liveGames.list_view, 1680, 950);
            let scrollprop2 = self.lobby_scrollbar.scrollable(self.lobby_baccaratTables, self.lobby_baccaratTables.list_view, 1680, 950);
            // let scrollTo_0 = self.lobby_scrollbar.makeScrollToButton(self.lobby_liveGames.list_view, "", 0, self.lobby_liveGames.list_view.y, scrollprop);
            // let scrollTo_1 = self.lobby_scrollbar.makeScrollToButton(self.lobby_liveGames.thumbnail_view, "", 0, self.lobby_liveGames.thumbnail_view.y, scrollprop);
            // let scrollTo_2 = self.lobby_scrollbar.makeScrollToButton(self.lobby_baccaratTables.list_view, "", 0, self.lobby_baccaratTables.list_view.y, scrollprop2);
        }

    }

    let setMaintenance = function (data) {
        for(var x = 0; x  < all_tables.length; x++) {
            if((data.gameName+"/" +data.tableId) ==  all_tables[x].namespace) {
                self.lobby_liveGames.all_list_table[x].maintenance(self.lobby_liveGames.all_list_table[x], data.data.status);
                if(self.lobby_liveGames.all_thumbnial_table) {
                    self.lobby_liveGames.all_thumbnial_table[x].maintenance(self.lobby_liveGames.all_thumbnial_table[x], data.data.status);
                }
            }
        }
        // sicbo
        for(var x = 0; x  < sicboTables.length; x++) {
            if((data.gameName+"/" +data.tableId) ==  sicboTables[x].namespace) {
                self.lobby_sicboTables.all_list_table[x].maintenance(self.lobby_sicboTables.all_list_table[x], data.data.status);
            }
        }
        // dragontiger
        for(var x = 0; x  < dragontigerTables.length; x++) {
            if((data.gameName+"/" +data.tableId) ==  dragontigerTables[x].namespace) {
                self.lobby_dragonTigerTables.all_list_table[x].maintenance(self.lobby_dragonTigerTables.all_list_table[x], data.data.status);
            }
        }
        // poker
        for(var x = 0; x  < pokerTables.length; x++) {
            if((data.gameName+"/" +data.tableId) ==  pokerTables[x].namespace) {
                self.lobby_pokerTables.all_list_table[x].maintenance(self.lobby_pokerTables.all_list_table[x], data.data.status);
            }
        }
        // baccarat
        for(var x = 0; x  < baccaratTables.length; x++) {
            if((data.gameName+"/" +data.tableId) ==  baccaratTables[x].namespace) {
                self.lobby_baccaratTables.all_list_table[x].maintenance(self.lobby_baccaratTables.all_list_table[x], data.data.status);
                self.lobby_baccaratTables.all_thumbnial_table[x].maintenance(self.lobby_baccaratTables.all_thumbnial_table[x], data.data.status);
            }
        }
    }

    let setResult =  function(data) {
        all_tables.forEach( function(e) {

            switch(`${e.gameName} ${data.gameName}`) {
                case "Sicbo Sicbo" :
                    // e.marks.push({"game_info" : '{"one":"'+data.gameResult.winner[0]+'", "two":"'+data.gameResult.winner[1]+'", "three":"'+data.gameResult.winner[2]+'"}', "id": 44044});
                    e.marks.push(data.mark);
                    break;
                case "Baccarat Baccarat" :
                    if(parseInt(data.tableId) != parseInt(e.tableNumber)) return;
                    e.marks.push(data.mark);
                    break;
                case "dragontiger dragontiger" :
                case "Dragon-Tiger Dragon-Tiger" :
                    e.marks.push(data.mark);
                    break;
                case "Poker Poker" :
                    e.marks.push(data.mark);
                    break;
            } // end switch
        });

        for(var x = 0; x < hot_tables_sample.length; x++) {

            if((data.gameName+"/"+data.tableId) == hot_tables_sample[x].namespace) {
                self.lobby_main.makeRoadmap(hot_tables_sample[x], x)
            }
        }
        self.lobby_liveGames.setResult(all_tables, data.gameName, data.tableId, data.meta);

        if(!self.is_mobile) {
            self.lobby_banner.setResult(all_tables, data.gameName, data.tableId, data.meta);
        }

        switch (data.gameName) {
            case "Sicbo" :
                self.lobby_sicboTables.setResult(sicboTables, data.gameName, data.tableId);
                break;
            case "Baccarat" :
                self.lobby_baccaratTables.setResult(baccaratTables, data.gameName, data.tableId);
                break;
            case "Dragon-Tiger" :
                self.lobby_dragonTigerTables.setResult(dragontigerTables, data.gameName, data.tableId);
                break;
            case "Poker" :
                self.lobby_pokerTables.setResult(pokerTables, data.gameName, data.tableId, data.meta);
                break;
        }
    }

    let setCardSwipe = function (data) {
        if(data.gameName == "Sicbo") return;
        self.lobby_liveGames.inputResult(all_tables,data);

        switch  (data.gameName) {
            case "Baccarat" :
            case "baccarat" :
                self.lobby_baccaratTables.inputResult(all_tables,data);
                break;
            case "Dragon-Tiger" :
            case "dragontiger" :
                self.lobby_dragonTigerTables.inputResult(dragontigerTables,data);
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
        // console.log("setnewround", data)
        if(!self.is_mobile) {
            if(self.lobby_banner.currentSelected) {
                self.lobby_banner.card_result_container.removeAllChildren();
            }
        }

        self.lobby_liveGames.all_list_table.forEach((e, x)=>{
            if(e.game_name != data.gameName || e.table_number != data.tableId) {
                return;
            }
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
    /**
     * @param {eventDataobject}
     */
    let setTimer =  function(data) {
        // === all
        self.lobby_liveGames.all_list_table.forEach((e, x)=>{
            if(e.game_name != data.gameName || e.table_number != data.tableId) {
                return;
            }

            if(data.eventName =="stoptimer" || data.eventName =="setroundprogress") {
                data.bettingTime = 0
            }

            timer(e,data);
        });


        if(!self.is_mobile) {
            self.lobby_liveGames.all_thumbnial_table.forEach((e, x)=>{
                if(e.game_name != data.gameName || e.table_number != data.tableId) {
                    return;
                }
                if(data.eventName =="stoptimer" || data.eventName =="setroundprogress") {
                    data.bettingTime = 0
                }
                timer(e,data);
            });

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

        // === baccarat
        self.lobby_baccaratTables.all_list_table.forEach((e, x)=>{
            if(e.game_name != data.gameName || e.table_number != data.tableId) {
                return;
            }
            if(data.eventName =="stoptimer" || data.eventName =="setroundprogress") {
                data.bettingTime = 0
            }
            timer(e,data);
        });

        // === sicbo
        self.lobby_sicboTables.all_list_table.forEach((e, x)=>{
          if(e.game_name != data.gameName || e.table_number != data.tableId) {
                return;
            }
            if(data.eventName =="stoptimer" || data.eventName =="setroundprogress") {
                data.bettingTime = 0
            }
            timer(e,data);
        });

        // dragontiger tables
        self.lobby_dragonTigerTables.all_list_table.forEach((e, x)=>{
            if(e.game_name != data.gameName || e.table_number != data.tableId) {
                return;
            }
            if(data.eventName =="stoptimer" || data.eventName =="setroundprogress") {
                data.bettingTime = 0
            }
            timer(e,data);
        });

        // poker tables
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

    let timer = function(e, data) {
        if(!e.is_timerStart) {
            e.timer.visible = true
            e.timer.timer(data.bettingTime, parseInt(data.totalTime))
            e.is_timerStart = true;
            e.status.text = "Now Betting"
            if(data.gameName == "Poker") {
                e.status.text = data.type  == "startround" ?  "Now Betting" : "Bet " + data.type
            }
        }

        if(data.bettingTime == 0) { // hiding bet time
            e.timer.visible = false
            e.status.text = "Betting End";
            e.is_timerStart = false;
        }
    }
}
