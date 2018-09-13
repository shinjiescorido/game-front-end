import lobby_main from '../components/mobile/lobby_main';
import lobby_liveGames from '../components/mobile/lobby_allLiveGames';
import lobby_themedGames from '../components/mobile/lobby_themedGames';
import lobby_liveGames_baccarat from '../components/mobile/lobby_liveGames_baccarat';
import lobby_liveGames_sicbo from '../components/mobile/lobby_liveGames_sicbo';
import lobby_liveGames_dragonTiger from '../components/mobile/lobby_liveGames_dragonTiger';
import lobby_liveGames_poker from '../components/mobile/lobby_liveGames_poker';

import lobby_themedGames_pulaputi from '../components/mobile/lobby_themedGames_pulaputi';
import lobby_themedGames_bigWheel from '../components/mobile/lobby_themedGames_bigWheel';

import scrollbar from '../factories/scrollbar';
import lobby_reelGames from '../components/mobile/lobby_reelGames';
import lobby_win_popup from '../components/mobile/lobby_win_popup';
import popup_betHistory from '../components/mobile/popup_betHistory';
import popup_transactions from '../components/mobile/popup_transactions';
import popup_all_data from '../components/mobile/popup_all_data';
import popup_pulaputi_data from '../components/mobile/popup_pulaputi_data';
import popup_bigwheel_data from '../components/mobile/popup_bigwheel_data';
import popup_dragontiger_data from '../components/mobile/popup_dragontiger_data';
import popup_baccarat_data from '../components/mobile/popup_baccarat_data';
import popup_supersix_data from '../components/mobile/popup_supersix_data';
import popup_dragonbonus_data from '../components/mobile/popup_dragonbonus_data';
import popup_poker_data from '../components/mobile/popup_poker_data';

import popup_bonusplus_data from '../components/mobile/popup_bonusplus_data';
import popup_sicbo_data from '../components/mobile/popup_sicbo_data';
// import popup_howTo from '../components/mobile/popup_howTo';
import lobby_howtoplay from '../components/mobile/lobby_howtoplay';
import popup_sicbo_rules from '../components/mobile/popup_sicbo_rules';
import popup_settings from '../components/mobile/popup_settings';

//confirmation modal
import confirmation_modal from '../components/mobile/lobby_confirmation_modal';

import {listen, someCallback} from '../listeners/lobby-events-m';
import initListen from '../listeners/lobby-live-init-m';
import {themedListen, themedCallback} from '../listeners/themed-events-m';
import initThemedListen from '../listeners/lobby-themed-init-m';

import lobby_maintenance_page from '../components/mobile/lobby_maintenance_page';

// === timer import
import timer from '../timer-animation';

let links  = {
    getTransferLogs: "m/transferlogs",

    getAllData: "/alllogs",
    getBaccaratData : "/baccaratlogs",
    getSupersixData : "/supersixlogs",
    getDragonBonusData : "/dragonbonuslogs",
    getPokerData : "/pokerlogs",
    getBonusPlusData : "/bonuspluslogs",
    getSicboData : "/sicbologs",
    getDragonTigerData : "/dragontigerlogs",
    getPulaputiData : "/pulaputilogs",
    getBigwheelData : "/bigwheellogs",
    getKagaData : "/kagalogs",

    getPulaputiDetails: "/details/getPulaputiDetails",
    getSupersixDetails: "/details/getSupersixDetails",
    getDragonBonusDetails: "/details/getDragonBonusDetails",
    getDragontigerDetails: "/details/getDragontigerDetails",
    getBaccaratDetails: "/details/getBaccaratDetails",
    getPokerDetails: "/details/getPokerDetails",
    getBonusPlusDetails: "/details/getBonusPlusDetails",
    getSicboDetails: "/details/getSicboDetails",
}

export default new blu.Screen({
    lobby_main: lobby_main(),

    lobby_liveGames: lobby_liveGames(),
    lobby_reelGames: lobby_reelGames(),
    lobby_win_popup: lobby_win_popup(),
    lobby_baccaratTables : lobby_liveGames_baccarat(),
    lobby_sicboTables : lobby_liveGames_sicbo(),
    lobby_dragonTigerTables: lobby_liveGames_dragonTiger(),
    lobby_pokerTables : lobby_liveGames_poker(),

    lobby_all_data: popup_all_data(links),
    lobby_pulaputi_data: popup_pulaputi_data(links),
    lobby_bigwheel_data: popup_bigwheel_data(links),
    lobby_dragontiger_data: popup_dragontiger_data(links),
    lobby_baccarat_data: popup_baccarat_data(links),
    lobby_supersix_data: popup_supersix_data(links),
    lobby_dragonbonus_data: popup_dragonbonus_data(links),
    lobby_poker_data: popup_poker_data(links),
    lobby_bonusplus_data: popup_bonusplus_data(links),
    lobby_sicbo_data: popup_sicbo_data(links),

    lobby_themedGames: lobby_themedGames(),
    lobby_pulaputiTables: lobby_themedGames_pulaputi(),
    lobby_bigWheelTables: lobby_themedGames_bigWheel(),

    lobby_popup_betHistory: popup_betHistory(links),
    lobby_pulaputi_data: popup_pulaputi_data(links),

    lobby_popup_transactions: popup_transactions(links),

    // lobby_popup_howTo: popup_howTo(),
    lobby_howtoplay: lobby_howtoplay(),

    lobby_maintenance: lobby_maintenance_page(),
    lobby_popup_settings : popup_settings(),

    //confirmation modal
    confirmation_modal: confirmation_modal(),

    use_timer: timer,
    dealer_id : [],
    lobby_scrollbar : scrollbar(),

    socket : io.connect(window.socket+'all', { //io.connect('https://socket.nihtanv2.com/all', {
        transports: ['websocket']
    }),
    resources: "/lobby-mobile.json",

    detectmob() {
         if( navigator.userAgent.match(/Android/i))
         {
            return 'Android';
         }else if(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i))
         {
            return 'iPhone';
         }else {
            return 'none';
         }
    },
    touchDisnable () {
        var mobileString = this.detectmob();

      if(mobileString == 'Android')
      {
        if(typeof Android !== "undefined" && Android !== null)
        {
            Android.touchEventDisnable();
        }
      }
    },
    touchEnable () {

        var mobileString = this.detectmob();
        if(mobileString == 'Android')
          {
            if(typeof Android !== "undefined" && Android !== null)
            {
                Android.touchEventEnable();
            }
          }
    },
    init () {
        this.touchDisnable();
        this.loaded = false;
        initListen(this)
        initThemedListen(this);
        this.stage.resize(window.innerWidth, window.innerHeight);
    },
    loaded_asset: function (e) {
        this.loaded = e;
    },
    loading: function(e) {
        if(e > 1) {
            e =1;
        }
        $(".card--percent").html("" + Math.round((e * 100)) + "%")
    },
    is_mobile : true,

    main() {
        this.touchEnable();
        // $(".loading").hide();
        $(".wrapper").hide()
        window.removeEventListener('deviceorientation', origOrientation);
        setTimeout(()=> {
            window.finished_load = true;
        }, 1000)

        createjs.Touch.enable(this.context.stage);

        this.addComponent(this.lobby_scrollbar);
        this.addComponent(this.lobby_main);
        this.addComponent(this.lobby_reelGames);

        this.addComponent(this.lobby_liveGames);
        this.addComponent(this.lobby_win_popup);
        this.addComponent(this.lobby_baccaratTables);
        this.addComponent(this.lobby_sicboTables);
        this.addComponent(this.lobby_dragonTigerTables);
        this.addComponent(this.lobby_pokerTables);

        this.addComponent(this.lobby_themedGames);
        this.addComponent(this.lobby_pulaputiTables);
        this.addComponent(this.lobby_bigWheelTables);

        //settings
        this.addComponent(this.lobby_popup_settings);

        //bet history modal
        this.addComponent(this.lobby_all_data);
        this.addComponent(this.lobby_pulaputi_data);
        this.addComponent(this.lobby_bigwheel_data);
        this.addComponent(this.lobby_dragontiger_data);
        this.addComponent(this.lobby_baccarat_data);
        this.addComponent(this.lobby_supersix_data);
        this.addComponent(this.lobby_dragonbonus_data);
        this.addComponent(this.lobby_poker_data);
        this.addComponent(this.lobby_bonusplus_data);
        this.addComponent(this.lobby_sicbo_data);
        this.addComponent(this.lobby_popup_betHistory);

        //transactions
        this.addComponent(this.lobby_popup_transactions);

        // how to play
        this.addComponent(this.lobby_howtoplay);

        //confirmation modal
        this.addComponent(this.lobby_maintenance);
        this.addComponent(this.confirmation_modal);

        this.is_loaded = true;
        listen(this);
        themedListen(this);

        window.redirectCasino = () => {
            if(!this.lobby_main.visible)
            {
                this.hideAll();
                toggleView("main");
            }
            this.confirmation_modal.redirectCasinoPage();
        }

        toggleView = (view_name) => {
            $( ".tables-container").scrollTop(0);

            createjs.Ticker.paused = false;
            someCallback(view_name, this);
            themedCallback(view_name, this);
            // this.hidePopups();
            //window.livegames_subheader.sub_header_allGames.normal(window.livegames_subheader.sub_header_allGames);
            __global.livegames_subheader.sub_header_baccarat.normal(__global.livegames_subheader.sub_header_baccarat);
            __global.livegames_subheader.sub_header_poker.normal(__global.livegames_subheader.sub_header_poker);
            __global.livegames_subheader.sub_header_sicbo.normal(__global.livegames_subheader.sub_header_sicbo);
            __global.livegames_subheader.sub_header_dragonTiger.normal(__global.livegames_subheader.sub_header_dragonTiger);
            __global.livegames_subheader.sub_header_supersix.normal(__global.livegames_subheader.sub_header_supersix);
            __global.livegames_subheader.sub_header_bonus.normal(__global.livegames_subheader.sub_header_bonus);

            //window.themed_subheader.sub_header_allGames.normal(window.themed_subheader.sub_header_allGames);
            __global.themed_subheader.sub_header_redwhite.normal(__global.themed_subheader.sub_header_redwhite);
            __global.themed_subheader.sub_header_spinwin.normal(__global.themed_subheader.sub_header_spinwin);

            __global.reel_subheader.kagaming.normal(__global.reel_subheader.kagaming);
            __global.reel_subheader.betsoft.normal(__global.reel_subheader.betsoft);
            __global.reel_subheader.allgames.normal(__global.reel_subheader.allgames);

            header_c.children[1].visible = true
            header_c.children[2].visible = false

            $(".lobby-main-container").css({'top': '95px'});

            switch(view_name) {
                case "main":
                    this.hideAll();
                    $(".tables-container").css("top" ,"95px")
                    $(".tables-container").css("overflow" ,"hidden")
                    this.lobby_main.visible = true;
                    $(".lobby-main-container").show();
                    header_c.children[1].visible = false
                    this.lobby_main.createMain()
                    $("#lobby").show();
                    break;
                case "sub_poker" :
                    this.hideAll();
                    $(".tables-container").css("top" ,"168px")
                    $(".tables-container").css("overflow" ,"scroll")
                    __global.livegames_subheader.visible = true;

                    __global.livegames_subheader.sub_header_poker.active(__global.livegames_subheader.sub_header_poker);

                    this.lobby_pokerTables.visible = true;

                    $(".poker-tables").show();
                    header_c.children[0].children[2].active(header_c.children[0].children[2]);
                    break;
                case "sub_dragonTiger" :
                    this.hideAll();
                    $(".tables-container").css("top" ,"168px")
                    $(".tables-container").css("overflow" ,"scroll")

                    __global.livegames_subheader.sub_header_dragonTiger.active(__global.livegames_subheader.sub_header_dragonTiger);

                    __global.livegames_subheader.visible = true;
                    this.lobby_dragonTigerTables.visible = true;

                    $(".dt-tables").show();
                    header_c.children[0].children[2].active(header_c.children[0].children[2]);
                    break;
                case "sub_baccarat" :
                    this.hideAll();
                    $(".tables-container").css("top" ,"168px")
                    $(".tables-container").css("overflow" ,"scroll")
                    for(var x=  0; x < baccarat_c.length; x++) {
                        if(!baccarat_c[x].children.length) $(baccarat_c[x].canvas).hide();
                        else $(baccarat_c[x].canvas).show();
                    }
                    __global.livegames_subheader.sub_header_baccarat.active(__global.livegames_subheader.sub_header_baccarat);
                    __global.livegames_subheader.visible = true;
                    this.lobby_baccaratTables.visible = true;

                    $(".bc-tables").show();
                    header_c.children[0].children[2].active(header_c.children[0].children[2]);
                    break;
                case "sub_supersix" :
                    this.hideAll();
                    $(".something").css("top" ,"168px")
                    $(".something").css("overflow" ,"scroll")
                    $(".bc-tables").show();
                    for(var x=  0; x < baccarat_c.length; x++) {
                        if(!baccarat_c[x].children.length) $(baccarat_c[x].canvas).hide();
                        else $(baccarat_c[x].canvas).show();
                    }
                    __global.livegames_subheader.sub_header_supersix.active(__global.livegames_subheader.sub_header_supersix);
                    __global.livegames_subheader.visible = true;
                    this.lobby_baccaratTables.visible = true;
                    this.context.stage.canvas.height = !this.lobby_baccaratTables.list_view.getBounds() ? 1000 : this.lobby_baccaratTables.list_view.getBounds().height + 100;
                    break;

                case "sub_bonus" :
                    this.hideAll();
                    $(".something").css("top" ,"168px")
                    $(".something").css("overflow" ,"scroll")
                    $(".bc-tables").show();
                    for(var x=  0; x < baccarat_c.length; x++) {
                        if(!baccarat_c[x].children.length) $(baccarat_c[x].canvas).hide();
                        else $(baccarat_c[x].canvas).show();
                    }
                    __global.livegames_subheader.sub_header_bonus.active(__global.livegames_subheader.sub_header_bonus);
                    __global.livegames_subheader.visible = true;
                    this.lobby_baccaratTables.visible = true;
                    this.context.stage.canvas.height = !this.lobby_baccaratTables.list_view.getBounds() ? 1000 : this.lobby_baccaratTables.list_view.getBounds().height + 100;
                    break;

                case "sub_sicbo" :
                    this.hideAll();
                    $(".tables-container").css("top" ,"168px")
                    $(".tables-container").css("overflow" ,"scroll")
                    __global.livegames_subheader.sub_header_sicbo.active(__global.livegames_subheader.sub_header_sicbo);
                    __global.livegames_subheader.visible = true;
                    this.lobby_sicboTables.visible = true;


                    $(".sb-tables").show();
                    header_c.children[0].children[2].active(header_c.children[0].children[2]);
                    break;
                case "reel_games" : case "allgames" : case "betsoft" : case "kagaming" :
                    $(".lobby-main-container").show()
                    $(".tables-container").hide()
                    this.hideAll();
                    this.lobby_reelGames.visible = true;
                    __global.reel_subheader.visible = true;
                    this.lobby_main.visible = false;
                    $(".tables-container").css("top" ,"166px")
                    $(".tables-container").css("overflow" ,"scroll")
                    view_name = (view_name == "reel_games") ? "allgames" : view_name;
                    this.lobby_reelGames.toggleView(view_name);
                    $(".lobby-main-container").css({'top': '168px', 'overflow' : 'scroll'});
                    $(".lobby-main-container").show();
                    header_c.children[2].visible = true
                    header_c.children[1].visible = false
                    __global.reel_subheader.allgames.active(__global.reel_subheader.kagaming);
                    break;

                case "live_games" :
                    this.hideAll();
                    this.lobby_liveGames.visible = true;
                    this.lobby_main.visible = false;

                    __global.livegames_subheader.sub_header_baccarat.active(__global.livegames_subheader.sub_header_baccarat);
                    __global.livegames_subheader.visible = true;

                    for(var x=  0; x < baccarat_c.length; x++) {
                        if(!baccarat_c[x].children.length) {
                            $(baccarat_c[x].canvas).hide()
                            baccarat_c[x].update();
                        }
                        else $(baccarat_c[x].canvas).show();
                    }
                    $(".bc-tables").show();

                    $(".tables-container").css("top" ,"168px")
                    $(".tables-container").css("overflow" ,"scroll")
                    break;
                case "themed_games" :
                    this.hideAll();
                    this.lobby_themedGames.visible = true;

                    $(".tables-container").css("top" ,"168px")
                    $(".tables-container").css("overflow" ,"scroll")
                    break;
                case "sub_pulaputi":
                    this.hideAll();
                    $(".tables-container").css("top" ,"168px")
                    $(".tables-container").css("overflow" ,"scroll")
                    __global.themed_subheader.visible = true;
                    this.lobby_pulaputiTables.visible = true;

                    __global.themed_subheader.sub_header_redwhite.active(__global.themed_subheader.sub_header_redwhite);
                    break;
                case "sub_spinwin":
                    this.hideAll();
                    $(".tables-container").css("top" ,"168px")
                    $(".tables-container").css("overflow" ,"scroll")
                    __global.themed_subheader.visible = true;
                    this.lobby_bigWheelTables.visible = true;

                    __global.themed_subheader.sub_header_spinwin.active(__global.themed_subheader.sub_header_spinwin);
                    break;

                case "thumbnail_howtoplay" :
                    $(".tables-container").css("top" ,"95px");
                    this.hideAll();
                    this.lobby_howtoplay.visible = true;
                    this.context.stage.canvas.height = 608;
                    this.lobby_howtoplay.active_page = "baccarat";
                    this.lobby_howtoplay.openRulesPage();
                    header_c.children[1].visible = false
                    $(".lobby-main-container").addClass("bg-grey")
                    $(".lobby-main-container, #lobby-content").show()
                    // header_c.canvas.height = 100;
                    break;


                case "thumbnail_settings":
                    $(".tables-container").css("top" ,"95px");
                    __global.livegames_subheader.visible = false;
                    __global.themed_subheader.visible = false;
                    this.context.stage.canvas.height = 608;
                    this.hideAll();
                    header_c.children[1].visible = false
                    // header_c.canvas.height = 100;
                    $(".lobby-main-container, #lobby-content").show()
                    $(".lobby-main-container").addClass("bg-grey")
                    if(!this.lobby_popup_settings.visible) {
                        this.lobby_popup_settings.visible = true;
                    } else {
                        this.lobby_popup_settings.visible = false;
                    }
                    break;
                case "thumbnail_bethistory" :
                    this.hideAll();
                    // header_c.canvas.height = 100;
                    header_c.children[1].visible = false
                    $(".lobby-main-container, #lobby-content").show()
                    $(".lobby-main-container").addClass("bg-grey")
                    this.context.stage.canvas.height = 608;

                    $(".tables-container").css("top" ,"95px")

                    //Remove all children
                    this.lobby_popup_betHistory.betRecordCon.removeAllChildren();
                    this.lobby_popup_betHistory.betDataCon.removeAllChildren();
                    this.lobby_popup_betHistory.paginationCon.removeAllChildren();

                    this.lobby_baccarat_data.betResult.removeAllChildren();
                    this.lobby_baccarat_data.betDetails.removeAllChildren();

                    this.lobby_poker_data.betResult.removeAllChildren();
                    this.lobby_poker_data.betDetails.removeAllChildren();

                    this.lobby_sicbo_data.betResult.removeAllChildren();
                    this.lobby_sicbo_data.betDetails.removeAllChildren();

                    this.lobby_dragontiger_data.betResult.removeAllChildren();
                    this.lobby_dragontiger_data.betDetails.removeAllChildren();

                    this.lobby_pulaputi_data.betResult.removeAllChildren();
                    this.lobby_pulaputi_data.betDetails.removeAllChildren();

                    this.lobby_bigwheel_data.betResult.removeAllChildren();
                    this.lobby_bigwheel_data.betDetails.removeAllChildren();
                    this.lobby_popup_betHistory.main();
                    this.lobby_popup_betHistory.visible = true;
                    this.lobby_popup_betHistory.initRecords("BACCARAT");
                    break;

                case "thumbnail_transactions" :
                    this.hideAll();
                    // header_c.canvas.height = 100;
                    header_c.children[1].visible = false
                    $(".lobby-main-container, #lobby-content").show()
                    $(".lobby-main-container").addClass("bg-grey")
                    this.lobby_popup_transactions.main();
                    this.lobby_popup_transactions.visible = true;
                    this.lobby_popup_transactions.initRecords();
                    this.context.stage.canvas.height = 608;

                    $(".tables-container").css("top" ,"95px")
                    break;
            }
        }
    },

    hidePopups () {

        let toHide = [this.lobby_popup_betHistory];

        toHide.forEach((obj) => {
            if(obj.visible) {
                createjs.Tween.get(obj)
                .to({
                    y : -80
                },100, createjs.Ease.quadOu)
                .call((e) => {
                    e.visible = false
                },[obj])
            }
        })

    },

    hideAll() {

       // header_c.canvas.height = 200;
       // stage1.removeAllChildren();
      $(".tables-container").hide();
      $(".lobby-main-container").hide();
      $(".lobby-main-container").removeClass("bg-grey")
      $("#lobby").hide();
      $(".kaga-container").hide();

      this.confirmation_modal.visible = false;
      this.lobby_reelGames.visible = false;
      this.lobby_main.visible = false;
      this.lobby_liveGames.visible = false;
      this.lobby_pokerTables.visible = false;
      this.lobby_dragonTigerTables.visible = false;
      this.lobby_baccaratTables.visible = false;
      this.lobby_sicboTables.visible = false;

      this.lobby_themedGames.visible = false;
      this.lobby_bigWheelTables.visible = false;
      this.lobby_pulaputiTables.visible = false;

      this.lobby_howtoplay.visible = false;
      this.lobby_howtoplay.closeAll();
      this.lobby_popup_betHistory.visible = false;
      this.lobby_popup_settings.visible = false
      this.lobby_popup_transactions.visible = false;
    }
});
