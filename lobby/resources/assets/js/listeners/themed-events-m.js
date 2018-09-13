import Xpacket from '../lib/XPacket';
import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap, setCurrentTimezone } from '../factories/factories';

window.themed_all_tables = [];
let pulaputiTables = null;
let bigWheelTables = null;

const themedListen = (self) => {
    // var socket = io.connect('http://10.1.10.12:9002/all', { 'transports': ['websocket'] });
    // var socket = io.connect(window.socket+'all', {
    //     transports: ['websocket']
    // });

    self.socket.on('connect', function (e) {
        // console.log("at themed-events: connected");
    });

    self.socket.on("data", (data)=>{

        let data_res = Xpacket.received(data)
        if(data_res.gameName == "Pula-Puti" || data_res.gameName == "Big-Wheel") {
        }  //console.log(data_res);

        switch(data_res.eventName) {
            // case ("init") :
            //     init(data_res);
            //     break;
            case ("setbettingtime") :
                setTimer(data_res);
                break;
            case ("bettimer") :
                setTimer(data_res);
                break;
            case ("newround") :
                setNewRound(data_res);
                break;
            case ("displayresults") :
                setResult(data_res);
                break;
            case ("setroundhold") :
                setTimer(data_res);
                break;
            case ("setroundprogress") :
                setTimer(data_res);
                break;
            case ("maintenanceChange") :
                setMaintenance(data_res);
                break;
            case ("mainmaintenancechange") :
                setMainMaintenance(data_res.data);
                break;
            case ("dealerchange") :
                setDealer(data_res);
                break;
        }

    });


    self.initThemedTable = function (data) {
        //check if main maintenance is active
        if (data) {
            // setMainMaintenance(data.data[0].mainMaintenance);
        }

        //set pulaputi games data
        pulaputiTables = _.filter(themed_all_tables, function(row) { return row.gameName == "Pula-Puti" });

        //set bigwheel games data
        bigWheelTables = _.filter(themed_all_tables, function(row) { return row.gameName == "Big-Wheel" });
    }

    if(self.data_flag) {
        self.initThemedTable();
    }

    let setResult =  function(data) {
        themed_all_tables.forEach( function(e) {
            switch(`${e.gameName} ${data.gameName}`) {
                case "Big-Wheel Big-Wheel" :
                    e.marks.push({mark : {num: data.mark.mark.num}});
                    break;
                case "Pula-Puti Pula-Puti" :
                    e.marks.push({mark : {mark : data.mark.mark.mark, gameInfo : data.mark.mark.gameInfo}});
                    break;
            } // end switch
        });

        self.lobby_themedGames.setResult(themed_all_tables, data.gameName, data.tableId, data.eventName);

        switch (data.gameName) {
          case "Big-Wheel" :
              self.lobby_bigWheelTables.setResult(bigWheelTables, data.gameName, data.tableId, data.eventName);
              break;
            case "Pula-Puti" :
              self.lobby_pulaputiTables.setResult(pulaputiTables, data.gameName, data.tableId, data.eventName);
              break;
        }
    }
    let setMainMaintenance =  function(data) {
        if (data.status === undefined) return;

        let mainText = '';
        let subText = '';

        let newStartTime = setCurrentTimezone(data.start_time);
        let newEndTime = setCurrentTimezone(data.end_time);

        if (parseInt(data.mainText) == 1) {
            mainText = window.language.lobby.maintextCap1;
        }
        else if (parseInt(data.mainText) == 2) {
            mainText = window.language.lobby.maintextCap2;
        }
        else if (parseInt(data.mainText) == 3) {
            mainText = window.language.lobby.maintextCap3;
        }

        if (parseInt(data.subText) == 1) {
            subText = window.language.lobby.subtextCap1;
        }
        else if (parseInt(data.subText) == 2) {
            subText = window.language.lobby.subtextCap2;
        }
        else if (parseInt(data.subText) == 3) {
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
    let setMaintenance =  function(data) {
        window.themed_all_tables.forEach((row)=>{
            if(row.tableNumber == data.tableId && row.gameName == data.gameName) {
                row.maintenanceSetting.forEach((maintenance)=>{
                    if(maintenance.division == data.data.division) {
                        maintenance.status = data.data.status
                    }
                });
            }
        });

        self.lobby_themedGames.all_list_table.forEach((e, x)=>{
            if(e.game_name != data.gameName || e.table_number != data.tableId) {
                return;
            }

            if (data.gameName == 'Pula-Puti' || data.gameName == 'Big-Wheel') {
              self.lobby_themedGames.setMaintenance(data, x);
            }
        });

        // === pulaputi
        self.lobby_pulaputiTables.all_list_table.forEach((e, x)=>{
           if(e.game_name != data.gameName || e.table_number != data.tableId) {
                return;
            }
            e.round_num.text = data.roundNum;
            e.status.text = 'Now Betting';

            if (data.gameName == 'Pula-Puti') {
                self.lobby_pulaputiTables.setMaintenance(data, x);
            }
        });

        // === bigwheel
        self.lobby_bigWheelTables.all_list_table.forEach((e, x)=>{
           if(e.game_name != data.gameName || e.table_number != data.tableId) {
                return;
            }
            e.round_num.text = data.roundNum;
            e.status.text = 'Now Betting';

            if (data.gameName == 'Big-Wheel') {
                self.lobby_bigWheelTables.setMaintenance(data, x);
            }
        });
    }

    let setNewRound = function(data) {
        self.lobby_themedGames.all_list_table.forEach((e, x)=>{
            if(e.game_name != data.gameName || e.table_number != data.tableId) {
                return;
            }
            e.round_num.text = data.roundNum;
            e.status.text = 'Now Betting';

            if (data.gameName == 'Pula-Puti') {
                self.lobby_themedGames.reInitAnim(data, x);
            }
        });

        // === pulaputi
        self.lobby_pulaputiTables.all_list_table.forEach((e, x)=>{
           if(e.game_name != data.gameName || e.table_number != data.tableId) {
                return;
            }
            e.round_num.text = data.roundNum;
            e.status.text = 'Now Betting';

            if (data.gameName == 'Pula-Puti') {
                self.lobby_pulaputiTables.reInitAnim(data, x);
            }
        });

        // === bigwheel
        self.lobby_bigWheelTables.all_list_table.forEach((e, x)=>{
           if(e.game_name != data.gameName || e.table_number != data.tableId) {
                return;
            }
            e.round_num.text = data.roundNum;
            e.status.text = 'Now Betting';
        });
    }
    /**
     * @param {eventDataobject}
     */
    let setTimer =  function(data) {
        // === all
        self.lobby_themedGames.all_list_table.forEach((e, x)=>{
            if(e.game_name != data.gameName || e.table_number != data.tableId) {
                return;
            }

            if(data.eventName =="setroundprogress" || data.eventName =="setroundhold") {
                data.bettingTime = 0;
            }

            timer(e,data);
        });


        // === pulaputi
        self.lobby_pulaputiTables.all_list_table.forEach((e, x)=>{
          if(e.game_name != data.gameName || e.table_number != data.tableId) {
                return;
            }
            if(data.eventName =="setroundhold" || data.eventName =="setroundhold") {
                data.bettingTime = 0
            }

            timer(e,data);
        });

        // === bigwheel
        self.lobby_bigWheelTables.all_list_table.forEach((e, x)=>{
          if(e.game_name != data.gameName || e.table_number != data.tableId) {
                return;
            }
            if(data.eventName =="setroundhold" || data.eventName =="setroundhold") {
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
            e.status.text = window.language.lobby.nowbetting;
        }

        if(data.bettingTime == 0) { // hiding bet time
            e.timer.visible = false
            e.status.text = window.language.lobby.bettingend;
            e.is_timerStart = false;

            if (data.eventName == 'setroundhold') {
                e.status.text = window.language.lobby.roundhold;
            }
        }
    }

    let setDealer = function(data) {
      window.themed_all_tables.forEach((e, x)=>{
        if(e.gameName == data.gameName && e.tableNumber == data.tableId) {

          e.dealerImage = data.dealerImage;
          e.currentDealer = data.dealerName;
        }



      });

        self.lobby_themedGames.all_list_table.forEach((e, x)=>{
            if(e.game_name != data.gameName || e.table_number != data.tableId) {
                return;
            }
            let image = new Image();
            image.src = data.dealerImage;
            e.dealer_img.image = image;
            e.dealer_name.text = data.dealerName;

            // console.log(":::: e.dealer_img ", e.dealer_img);
            // console.log(":::: e.dealer_name ", e.dealer_name);

        });

        // === pulaputi
        self.lobby_pulaputiTables.all_list_table.forEach((e, x)=>{
           if(e.game_name != data.gameName || e.table_number != data.tableId) {
                return;
            }
            let image = new Image();
            image.src = data.dealerImage;
            e.dealer_img.image = image;
            e.dealer_name.text = data.dealerName;

            // console.log(":::: e.dealer_img ", e.dealer_img);
            // console.log(":::: e.dealer_name ", e.dealer_name);

        });

        // === bigwheel
        self.lobby_bigWheelTables.all_list_table.forEach((e, x)=>{
           if(e.game_name != data.gameName || e.table_number != data.tableId) {
                return;
            }
            let image = new Image();
            image.src = data.dealerImage;
            e.dealer_img.image = image;
            e.dealer_name.text = data.dealerName;

            // console.log(":::: e.dealer_img ", e.dealer_img);
            // console.log(":::: e.dealer_name ", e.dealer_name);

        });
    }
}

let current_open = "";

const themedCallback = (param, self) => {
    if(!param) return;
    if(param == "thumbnail_transactions" || param == "thumbnail_bethistory" || param == "thumbnail_howtoplay" || param == "thumbnail_settings") {
        return;
    }

    let hideComponents = () => {
        self.lobby_themedGames.list_view.removeAllChildren()
        self.lobby_pulaputiTables.list_view.removeAllChildren();
        self.lobby_bigWheelTables.list_view.removeAllChildren();


        self.lobby_themedGames.visible = false;
        self.lobby_pulaputiTables.visible = false;
        self.lobby_bigWheelTables.visible = false;
    }
    hideComponents();
        switch (param) {
            case "themed_games" :
                current_open = param;
                    self.lobby_themedGames.makeListTables(pulaputiTables, self.lobby_themedGames.list_view, self.lobby_themedGames.all_list_table); //set all games data thumbnail
                    self.lobby_themedGames.visible = true;
                break;

            case "sub_allThemedGames":
                current_open = param;
                    self.lobby_themedGames.makeListTables(pulaputiTables, self.lobby_themedGames.list_view, self.lobby_themedGames.all_list_table); //set all games data thumbnail
                    self.lobby_themedGames.visible = true;
                break;
            case "sub_pulaputi" :
                current_open = param;
                    self.lobby_pulaputiTables.makePulaputiTables(pulaputiTables);
                    self.lobby_pulaputiTables.visible = true;
                break;
            case "sub_spinwin":
                current_open = param;
                    self.lobby_bigWheelTables.makeBigWheelTables(bigWheelTables);
                    self.lobby_bigWheelTables.visible = true;
                break;
        }
};


export default {
    themedListen,
    themedCallback
}
