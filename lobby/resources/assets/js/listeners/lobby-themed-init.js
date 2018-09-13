import Xpacket from '../lib/XPacket';


export default(self) => {
    self.hot_live_games = [];

    var socket = io.connect(window.socket+'all', {
        transports: ['websocket']
    });

    socket.on('connect', function (e) {
        // console.log("at themed-events: connected");
    });

    socket.on("data", (data)=>{
        let data_res = Xpacket.received(data)
        switch(data_res.eventName) {
            case ("init") :
                init(data_res);
                break;
        }

    });

    let init = (data) => {
        window.themed_all_tables = data.data;
        window.themed_all_tables = _.filter(window.themed_all_tables, function (e) { // === filtering data
            if(e.gameName == "Big-Wheel") {
                return e;
            }
            if(e.gameName == "Pula-Puti") {
                return e;
            }
        });

        themed_all_tables = _.sortBy (themed_all_tables, (row) => {
            return row.gameName
        });

        if(self.loaded) {
            if (data.data.length > 0) {
                self.initThemedTable(data);
            }
        }

        self.data_flag = true;
    }
}
