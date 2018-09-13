import {
  createSprite,
  randomNum,
  createCardSprite,
  numberCounter,
  playSound,
  numberWithCommas,
  createSpriteRoadMap,
  setCurrentTimezone } from '../factories/factories';

import lobby_main from '../components/lobby_main';
import lobby_header from '../components/lobby_header';
import lobby_liveGames from '../components/lobby_allLiveGames';
import lobby_liveGames_baccarat from '../components/lobby_liveGames_baccarat';
import lobby_themedGames from '../components/lobby_themedGames';
import lobby_reelGames from '../components/lobby_reelGames';
import hotGames_sidebar from '../components/lobby_hotGamesSideBar';
import lobby_mainSidebar from '../components/lobby_mainSidebar';
import lobby_liveGames_poker from '../components/lobby_liveGames_poker';
import lobby_liveGames_sicbo from '../components/lobby_liveGames_sicbo';
import lobby_liveGames_dragonTiger from '../components/lobby_liveGames_dragonTiger';
import lobby_liveGames_roullete from '../components/lobby_liveGames_roullete';

import lobby_themedGames_pulaputi from '../components/lobby_themedGames_pulaputi';
import lobby_themedGames_bigWheel from '../components/lobby_themedGames_bigWheel';

import lobby_banner from '../components/lobby_banner';
import lobby_themedGames_banner from '../components/lobby_themedGames_banner';

import lobby_maintenance_page from '../components/lobby_maintenance_page';

import scrollbar from '../factories/scrollbar';

import {listen, someCallback} from '../listeners/lobby-events';
import initListen from '../listeners/lobby-live-init';
import {themedListen, themedCallback} from '../listeners/themed-events';
import initThemedListen from '../listeners/lobby-themed-init';

import popup_howTo from '../components/popup_howTo';
import popup_baccarat_rules from '../components/popup_baccarat_rules';
import popup_bigwheel_rules from '../components/popup_bigwheel_rules';
import popup_dragontiger_rules from '../components/popup_dragontiger_rules';
import popup_redwhite_rules from '../components/popup_redwhite_rules';
import popup_roulette_rules from '../components/popup_roulette_rules';
import popup_sicbo_rules from '../components/popup_sicbo_rules';
import popup_texasholdem_rules from '../components/popup_texasholdem_rules';

import popup_betHistory from '../components/popup_betHistory';
import popup_transactions from '../components/popup_transactions';
import popup_settings from '../components/popup_settings';
import subHeader from '../components/lobby_liveGames_subHeader';
import confirmation_modal from '../components/lobby_confirmation_modal';

import popup_all_data from '../components/popup_all_data';
import popup_pulaputi_data from '../components/popup_pulaputi_data';
import popup_bigwheel_data from '../components/popup_bigwheel_data';
import popup_dragontiger_data from '../components/popup_dragontiger_data';
import popup_baccarat_data from '../components/popup_baccarat_data';
import popup_supersix_data from '../components/popup_supersix_data';
import popup_dragonbonus_data from '../components/popup_dragonbonus_data';
import popup_poker_data from '../components/popup_poker_data';
import popup_bonusplus_data from '../components/popup_bonusplus_data';
import popup_sicbo_data from '../components/popup_sicbo_data';

import themed_subHeader from '../components/lobby_themedGames_subheader';
import win_popup from '../components/lobby_win_popup';
import win_popupgame from '../components/lobby_win_popupgame';

import theme_config from '../assets/theme_colors_config';

// === timer import
import timer from '../timer-animation';

let links  = {
    getTransferLogs: "/transferlogs",

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

    getBaccaratDetails: "/details/getBaccaratDetails",
    getSupersixDetails: "/details/getSupersixDetails",
    getDragonBonusDetails: "/details/getDragonBonusDetails",
    getPokerDetails: "/details/getPokerDetails",
    getBonusPlusDetails: "/details/getBonusPlusDetails",
    getSicboDetails: "/details/getSicboDetails",
    getPulaputiDetails: "/details/getPulaputiDetails",
    getBigWheelDetails: "/details/getBigWheelDetails",
    getDragontigerDetails: "/details/getDragontigerDetails",
}

export default new blu.Screen({
    resources: "/lobby.json",
    lobby_main: lobby_main(),
    lobby_header: lobby_header(),
    lobby_themedGames: lobby_themedGames(),
    lobby_reelGames: lobby_reelGames(),
    lobby_hotGamesSideBar: hotGames_sidebar(),
    lobby_mainSidebar: lobby_mainSidebar(),
    lobby_popup_howTo: popup_howTo(),
    lobby_popup_settings: popup_settings(),
    lobby_popup_betHistory: popup_betHistory(links),
    lobby_popup_transactions: popup_transactions(links),

    lobby_baccarat_rules: popup_baccarat_rules(),
    lobby_bigwheel_rules: popup_bigwheel_rules(),
    lobby_dragontiger_rules: popup_dragontiger_rules(),
    lobby_redwhite_rules: popup_redwhite_rules(),
    lobby_roulette_rules: popup_roulette_rules(),
    lobby_sicbo_rules: popup_sicbo_rules(),
    lobby_texasholdem_rules: popup_texasholdem_rules(),

    lobby_all_data: popup_all_data(links),
    lobby_baccarat_data: popup_baccarat_data(links),
    lobby_supersix_data: popup_supersix_data(links),
    lobby_dragonbonus_data: popup_dragonbonus_data(links),
    lobby_pulaputi_data: popup_pulaputi_data(links),
    lobby_bigwheel_data: popup_bigwheel_data(links),
    lobby_dragontiger_data: popup_dragontiger_data(links),
    lobby_poker_data: popup_poker_data(links),
    lobby_bonusplus_data: popup_bonusplus_data(links),
    lobby_sicbo_data: popup_sicbo_data(links),

    lobby_liveGames: lobby_liveGames(),
    lobby_baccaratTables : lobby_liveGames_baccarat(),
    lobby_pokerTables : lobby_liveGames_poker(),
    lobby_sicboTables : lobby_liveGames_sicbo(),
    lobby_dragonTigerTables: lobby_liveGames_dragonTiger(),
    lobby_roulleteTables: lobby_liveGames_roullete(),
    lobby_banner: lobby_banner(),
    lobby_themedGames_banner: lobby_themedGames_banner(),

    lobby_pulaputiTables : lobby_themedGames_pulaputi(),
    lobby_bigWheelTables: lobby_themedGames_bigWheel(),

    // Confirmation modal
    confirmation_modal: confirmation_modal(),

    lobby_maintenance: lobby_maintenance_page(),

    lobby_scrollbar : scrollbar(),

    use_timer: timer,
    dealer_id : [],

    lobby_liveGames_subHeader : subHeader(),

    lobby_themedGames_subHeader : themed_subHeader(),

    lobby_win_popup : win_popup(),
    lobby_win_popupgame : win_popupgame(),

    theme_color: theme_config(),

    body_bg_width : 230,
    data_res : null,
    hot_live_games : [],
    saved_theme_data : [],
    init () {
      	$.get('/kaga/list', {}, (response)=> {
        	ka_games = response.games;
      	});

        this.loaded = false;
        initListen(this);
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
    data_flag : false,
    main() {

        setTimeout(function(){
            $(".wrapper").hide();
            $(".loading").hide();
            $(".content-container").show()
        }, 500);


        // this.addComponent(this.lobby_scrollbar);
        this.addComponent(this.lobby_main);
        // this.addComponent(this.lobby_header);
        this.addComponent(this.lobby_liveGames);
        this.addComponent(this.lobby_themedGames);
        this.addComponent(this.lobby_reelGames);
        // this.addComponent(this.lobby_hotGamesSideBar);
        this.addComponent(this.lobby_pokerTables);
        this.addComponent(this.lobby_sicboTables);
        this.addComponent(this.lobby_baccaratTables);
        this.addComponent(this.lobby_dragonTigerTables);
        // this.addComponent(this.lobby_mainSidebar);
        this.addComponent(this.lobby_roulleteTables);
        this.addComponent(this.lobby_banner);

        this.addComponent(this.lobby_pulaputiTables);
        this.addComponent(this.lobby_bigWheelTables);
        this.addComponent(this.lobby_themedGames_banner);

        //allways on top
        // this.addComponent(this.lobby_liveGames_subHeader); //subheader
        // this.addComponent(this.lobby_themedGames_subHeader); //subheader

        //howto modal
        this.addComponent(this.lobby_baccarat_rules);
        this.addComponent(this.lobby_bigwheel_rules);
        this.addComponent(this.lobby_dragontiger_rules);
        this.addComponent(this.lobby_redwhite_rules);
        this.addComponent(this.lobby_roulette_rules);
        this.addComponent(this.lobby_sicbo_rules);
        this.addComponent(this.lobby_texasholdem_rules);
        this.addComponent(this.lobby_popup_howTo);

        this.addComponent(this.lobby_popup_settings);

        //bet history modal
        this.addComponent(this.lobby_baccarat_data);
        this.addComponent(this.lobby_supersix_data);
        this.addComponent(this.lobby_dragonbonus_data);
        this.addComponent(this.lobby_poker_data);
        this.addComponent(this.lobby_bonusplus_data);
        this.addComponent(this.lobby_sicbo_data);
        this.addComponent(this.lobby_dragontiger_data);
        this.addComponent(this.lobby_pulaputi_data);
        this.addComponent(this.lobby_bigwheel_data);
        this.addComponent(this.lobby_popup_betHistory);
        this.addComponent(this.lobby_popup_transactions);
        this.addComponent(this.lobby_all_data);

        this.addComponent(this.lobby_maintenance);
        this.addComponent(this.confirmation_modal);

        this.addComponent(this.lobby_win_popup);
        this.addComponent(this.lobby_win_popupgame);

        listen(this)
        themedListen(this);
        this.loaded = true;

        let inGame = this.getParameterByName('game');
        // if (!inGame) {
            playSound('welcome');
        // }

        this.setUser();

        toggle = this.toggleView;
        _this = this;

        finished_load = true; // check if loaded all

        let newDate = "";
        let callDate = function () {
            setTimeout(() => {
                newDate = moment().format('MMMM Do YYYY, h:mm:ss a');
                $(".timer__items.-timer > span").html(newDate);
                callDate()
            },1000)
        }

        callDate();
    },
    setUser() {
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

        $(".userinfo-dtl__name").text(window.username)
        $(".userinfo-dtl__holdings").text(currency+numberWithCommas(window.money))

        if((currency+numberWithCommas(window.money)).length > 8) {
            $(".userinfo-dtl__holdings").wrap("<div class='marquee'>")
        }

    },
    toggleView(view_name) {
        someCallback(view_name, _this);
        themedCallback(view_name, _this);

        // this.lobby_header.normalSubHead();

        _this.hidePopups();
        _this.toggleWinpopup(view_name);

        switch(view_name) {
            case "main" :
                $(".main-container").css('top','10%');
                _this.hideAll();
                $("#hot").show()
                $(".hot-container").show();
                _this.lobby_main.visible = true;
                _this.lobby_hotGamesSideBar.visible = false;
                _this.lobby_mainSidebar.visible = true;
                _this.lobby_hotGamesSideBar.visible = false;
                // this.lobby_liveGames_subHeader.visible = false;
                // this.lobby_themedGames_subHeader.visible = false;
                _this.lobby_banner.visible = false;
                _this.lobby_themedGames_banner.visible = false;

                _this.lobby_baccaratTables.visible = false;
                _this.lobby_liveGames.visible = false;
                _this.lobby_pokerTables.visible = false;
                _this.lobby_sicboTables.visible = false;
                _this.lobby_dragonTigerTables.visible = false;
                _this.lobby_roulleteTables.visible = false;
                break;
            case "live_games" :
                _this.hideAll();
                $(".main-container").css('top','30%')
                $("#bannerCanvas").show()
                $(".header-subnav__items.-baccarat").addClass("active")
                _this.lobby_liveGames.visible = true;
                _this.lobby_hotGamesSideBar.visible = true;
                _this.lobby_mainSidebar.visible = false;
                // this.lobby_liveGames_subHeader.visible = true;
                // this.lobby_themedGames_subHeader.visible = false;
                _this.lobby_themedGames_banner.visible = false;
                _this.lobby_banner.visible = true;
                _this.lobby_baccaratTables.visible = true;
                break;
            case "themed_games" :
                _this.hideAll();
                $(".main-container").css('top','30%')
                $("#bannerCanvas").show()
                _this.lobby_themedGames.visible = true;
                _this.lobby_hotGamesSideBar.visible = true;
                _this.lobby_mainSidebar.visible = false;
                // this.lobby_liveGames_subHeader.visible = false;
                // this.lobby_themedGames_subHeader.visible = true;
                _this.lobby_themedGames_banner.visible = true;

                _this.lobby_baccaratTables.visible = false;
                _this.lobby_liveGames.visible = false;
                _this.lobby_pokerTables.visible = false;
                _this.lobby_sicboTables.visible = false;
                _this.lobby_dragonTigerTables.visible = false;
                _this.lobby_roulleteTables.visible = false;
                break;
            case "sub_dragonTiger" :
                _this.hideAll();
                $(".main-container").css('top','30%')
                $("#bannerCanvas").show()
                $(".header-subnav__items.-dragontiger").addClass("active")
                _this.lobby_liveGames.visible = true;
                _this.lobby_hotGamesSideBar.visible = true;
                _this.lobby_mainSidebar.visible = false;
                // this.lobby_liveGames_subHeader.visible = true;
                // this.lobby_liveGames_subHeader.hideActive();
                // this.lobby_header.normalMainHead();
                // this.lobby_header.live_games_header.active(this.lobby_header.live_games_header)
                // this.lobby_liveGames_subHeader.sub_header_dragonTiger.active(this.lobby_liveGames_subHeader.sub_header_dragonTiger);
                // this.lobby_liveGames_subHeader.sub_header_dragonTiger.clicked = true;
                // this.lobby_themedGames_subHeader.visible = false;
                _this.lobby_banner.visible = true;
                _this.lobby_themedGames_banner.visible = false;
                _this.lobby_dragonTigerTables.visible = true;
                break;
            case "sub_poker" :
                _this.hideAll();
                $(".main-container").css('top','30%')
                $("#bannerCanvas").show()
                $(".header-subnav__items.-poker").addClass("active")
                _this.lobby_liveGames.visible = true;
                _this.lobby_hotGamesSideBar.visible = true;
                _this.lobby_mainSidebar.visible = false;
                // this.lobby_liveGames_subHeader.visible = true;
                // this.lobby_liveGames_subHeader.hideActive();
                // this.lobby_header.normalMainHead();
                // this.lobby_header.live_games_header.active(this.lobby_header.live_games_header)
                // this.lobby_liveGames_subHeader.sub_header_poker.active(this.lobby_liveGames_subHeader.sub_header_poker);
                // this.lobby_liveGames_subHeader.sub_header_poker.clicked = true;
                // this.lobby_themedGames_subHeader.visible = false;
                _this.lobby_banner.visible = true;
                _this.lobby_themedGames_banner.visible = false;
                _this.lobby_pokerTables.visible = true;
                break;
            case "sub_sicbo" :
                _this.hideAll();
                $(".main-container").css('top','30%')
                $("#bannerCanvas").show()
                $(".header-subnav__items.-scbo").addClass("active")
                _this.lobby_liveGames.visible = true;
                _this.lobby_hotGamesSideBar.visible = true;
                _this.lobby_mainSidebar.visible = false;
                // this.lobby_liveGames_subHeader.visible = true;
                // this.lobby_liveGames_subHeader.hideActive();
                // this.lobby_header.normalMainHead();
                // this.lobby_header.live_games_header.active(this.lobby_header.live_games_header)
                // this.lobby_liveGames_subHeader.sub_header_sicbo.active(this.lobby_liveGames_subHeader.sub_header_sicbo);
                // this.lobby_liveGames_subHeader.sub_header_sicbo.clicked = true;
                // this.lobby_themedGames_subHeader.visible = false;
                _this.lobby_banner.visible = true;
                _this.lobby_themedGames_banner.visible = false;
                _this.lobby_sicboTables.visible = true;
                break;
            case "sub_baccarat" :
                _this.hideAll();
                $("#bannerCanvas").show()
                $(".main-container").css('top','30%')
                $(".header-subnav__items.-baccarat").addClass("active")
                _this.lobby_liveGames.visible = true;
                _this.lobby_hotGamesSideBar.visible = true;
                _this.lobby_mainSidebar.visible = false;
                // this.lobby_liveGames_subHeader.visible = true;
                // this.lobby_liveGames_subHeader.hideActive();
                // this.lobby_header.normalMainHead();
                // this.lobby_header.live_games_header.active(this.lobby_header.live_games_header)
                // this.lobby_liveGames_subHeader.sub_header_baccarat.active(this.lobby_liveGames_subHeader.sub_header_baccarat);
                // this.lobby_liveGames_subHeader.sub_header_baccarat.clicked = true;
                // this.lobby_scrollbar.togglescrollable(this.lobby_baccaratTables.thumbnail_view, true);
                // this.lobby_themedGames_subHeader.visible = false;
                _this.lobby_banner.visible = true;
                _this.lobby_themedGames_banner.visible = false;
                _this.lobby_baccaratTables.visible = true;
                break;
            case "sub_supersix" :
                _this.hideAll();
                $("#bannerCanvas").show()
                $(".main-container").css('top','30%')
                $(".header-subnav__items.-supersix").addClass("active")
                _this.lobby_liveGames.visible = true;
                _this.lobby_hotGamesSideBar.visible = true;
                _this.lobby_baccaratTables.visible = true;
                _this.lobby_banner.visible = true;
                _this.lobby_mainSidebar.visible = false;
                _this.lobby_themedGames_banner.visible = false;
                break;
            case "sub_bonus" :
                _this.hideAll();
                $("#bannerCanvas").show()
                $(".main-container").css('top','30%')
                $(".header-subnav__items.-bonus").addClass("active")
                _this.lobby_liveGames.visible = true;
                _this.lobby_hotGamesSideBar.visible = true;
                _this.lobby_baccaratTables.visible = true;
                _this.lobby_banner.visible = true;
                _this.lobby_mainSidebar.visible = false;
                _this.lobby_themedGames_banner.visible = false;
                break;
            case "sub_spinwin" :
            _this.hideAll();
                $("#bannerCanvas").show()
                $(".main-container").css('top','30%')
                _this.lobby_liveGames.visible = false;
                _this.lobby_hotGamesSideBar.visible = true;
                _this.lobby_mainSidebar.visible = false;
                // this.lobby_liveGames_subHeader.visible = false;
                // this.lobby_themedGames_subHeader.hideActive();
                // this.lobby_themedGames_subHeader.visible = true;
                // this.lobby_header.normalMainHead();
                // this.lobby_header.themed_games_header.active(this.lobby_header.themed_games_header)
                // this.lobby_themedGames_subHeader.sub_header_spinwin.active(this.lobby_themedGames_subHeader.sub_header_spinwin);
                // this.lobby_themedGames_subHeader.sub_header_spinwin.clicked = true;
                _this.lobby_banner.visible = false;
                _this.lobby_themedGames_banner.visible = true;
                _this.lobby_bigWheelTables.visible = true;
            break;
            case "sub_pulaputi" :
                $("#bannerCanvas").show()
                $(".main-container").css('top','30%')
                _this.lobby_liveGames.visible = false;
                _this.lobby_hotGamesSideBar.visible = true;
                _this.lobby_mainSidebar.visible = false;
                // this.lobby_liveGames_subHeader.visible = false;
                // this.lobby_themedGames_subHeader.hideActive();
                // this.lobby_themedGames_subHeader.visible = true;
                // this.lobby_header.normalMainHead();
                // this.lobby_header.themed_games_header.active(this.lobby_header.themed_games_header)
                // this.lobby_themedGames_subHeader.sub_header_redwhite.active(this.lobby_themedGames_subHeader.sub_header_redwhite);
                // this.lobby_themedGames_subHeader.sub_header_redwhite.clicked = true;
                _this.lobby_banner.visible = false;
                _this.lobby_themedGames_banner.visible = true;
                _this.lobby_pulaputiTables.visible = true;
            break;
            case "reel_games" :
                _this.hideAll();
                $(".header-subnav__items.-gameall").addClass("active")
                _this.lobby_reelGames.visible = true;
                // this.lobby_header.normalMainHead();
                // this.lobby_header.reel_games_header.active(this.lobby_header.reel_games_header)
                // _this.lobby_reelGames.allgames.active(_this.lobby_reelGames.allgames);
                _this.lobby_hotGamesSideBar.visible = true;
                _this.lobby_banner.visible = false;
                _this.lobby_mainSidebar.visible = false;
                // this.lobby_liveGames_subHeader.visible = false;
                // this.lobby_themedGames_subHeader.visible = false;
                _this.lobby_themedGames_banner.visible = false;

                _this.lobby_baccaratTables.visible = false;
                _this.lobby_liveGames.visible = false;
                _this.lobby_pokerTables.visible = false;
                _this.lobby_sicboTables.visible = false;
                _this.lobby_dragonTigerTables.visible = false;
                _this.lobby_roulleteTables.visible = false;
                $(".banner-wrapper").hide();
            break;
            case "kagaming" :
                _this.hideAll();
                $(".header-subnav__items.-kagaming").addClass("active")
                _this.lobby_reelGames.visible = true;
                // this.lobby_header.normalMainHead();
                // this.lobby_header.reel_games_header.active(this.lobby_header.reel_games_header)
                // _this.lobby_reelGames.allgames.active(_this.lobby_reelGames.allgames);
                _this.lobby_hotGamesSideBar.visible = true;
                _this.lobby_banner.visible = false;
                _this.lobby_mainSidebar.visible = false;
                // this.lobby_liveGames_subHeader.visible = false;
                // this.lobby_themedGames_subHeader.visible = false;
                _this.lobby_themedGames_banner.visible = false;

                _this.lobby_baccaratTables.visible = false;
                _this.lobby_liveGames.visible = false;
                _this.lobby_pokerTables.visible = false;
                _this.lobby_sicboTables.visible = false;
                _this.lobby_dragonTigerTables.visible = false;
                _this.lobby_roulleteTables.visible = false;
                break;
            case "thumbnail_howtoplay" :
                _this.hidePopups()
                $('#howtoplay').toggleClass('active').siblings().removeClass('active');

                if(!popupHowto.children[0].visible) {
                    $("#popupHowto").show();
                // if(!_this.lobby_popup_howTo.visible) {
                    _this.confirmation_modal.visible = false;
                    popupHowto.children[0].visible = true;
                    // _this.lobby_popup_howTo.visible = true;
                    let self = _this;

                    setTimeout(function() {
                      self.lobby_popup_howTo.active_page = "baccarat";
                      self.lobby_popup_howTo.openRulesPage();
                    }, 80)

                    createjs.Tween.get(popupHowto.children[0])
                    .to({
                       y:20
                    },100, createjs.Ease.quadIn)
                } else {
                    createjs.Tween.get(popupHowto.children[0])
                    .to({
                        y:-280
                    },100, createjs.Ease.quadOut)
                    .call( (e)=>{
                        e.visible = false;
                    },[popupHowto.children[0]])
                    $("#popupSettings").hide();
                }
                break;
            case "thumbnail_settings":
                _this.hidePopups()
                $('#settings').toggleClass('active').siblings().removeClass('active');

                if(!popupSettings.children[0].visible) {
                // if(!_this.lobby_popup_settings.visible) {
                    _this.confirmation_modal.visible = false;
                    popupSettings.children[0].visible = true;
                    $("#popupSettings").show();
                    $(".popup-settings-container").show()

                    createjs.Tween.get(popupSettings.children[0])
                    .to({
                       y:100
                    },100, createjs.Ease.quadIn)
                } else {
                    $("#popupSettings").hide();
                    createjs.Tween.get(popupSettings.children[0])
                    .to({
                        y:-150
                    },100, createjs.Ease.quadOut)
                    .call( (e)=>{
                        e.visible = false;
                    },[popupSettings.children[0]])
                    $(".popup-settings-container").hide()
                }
                break;
            case "thumbnail_bethistory" :
                $('#bethistory').toggleClass('active').siblings().removeClass('active');

                if(!betHistory.children[0].visible) {
                // if(!_this.lobby_popup_betHistory.visible) {
                    _this.confirmation_modal.visible = false;
                    // betHistory.visible = true;
                    betHistory.children[0].visible = true
                    // _this.lobby_popup_betHistory.visible = true;
                    _this.lobby_popup_betHistory.initRecords('BACCARAT');

                    $("#betHistory").show();
                    createjs.Tween.get(betHistory.children[0])
                    // createjs.Tween.get(_this.lobby_popup_betHistory)
                    .to({
                       y:480
                    },100, createjs.Ease.quadIn)
                    .call(() => {
                    })
                } else {

                    createjs.Tween.get(betHistory.children[0])
                    // createjs.Tween.get(_this.lobby_popup_betHistory)
                    .to({
                        y:-80
                    },100, createjs.Ease.quadOut)
                    .call( (e)=>{
                        e.visible = false;
                    },[betHistory.children[0]])
                    .call(() =>{
                        $("#betHistory").hide();
                    })

                    // },[_this.lobby_popup_betHistory])

                    //Remove all children
                    _this.lobby_popup_betHistory.betRecordCon.removeAllChildren();
                    _this.lobby_popup_betHistory.betDataCon.removeAllChildren();
                    _this.lobby_popup_betHistory.paginationCon.removeAllChildren();

                    _this.lobby_baccarat_data.betResult.removeAllChildren();
                    _this.lobby_baccarat_data.betDetails.removeAllChildren();

                    _this.lobby_poker_data.betResult.removeAllChildren();
                    _this.lobby_poker_data.betDetails.removeAllChildren();

                    _this.lobby_sicbo_data.betResult.removeAllChildren();
                    _this.lobby_sicbo_data.betDetails.removeAllChildren();

                    _this.lobby_dragontiger_data.betResult.removeAllChildren();
                    _this.lobby_dragontiger_data.betDetails.removeAllChildren();

                    _this.lobby_pulaputi_data.betResult.removeAllChildren();
                    _this.lobby_pulaputi_data.betDetails.removeAllChildren();

                    _this.lobby_bigwheel_data.betResult.removeAllChildren();
                    _this.lobby_bigwheel_data.betDetails.removeAllChildren();
                }
                break;

            case "thumbnail_transactions" :
                $('#transactions').toggleClass('active').siblings().removeClass('active');

                if(!transHistory.children[0].visible) {
                    $("#transHistory").show();
                    transHistory.children[0].visible = true;

                     createjs.Tween.get(transHistory.children[0])
                    // createjs.Tween.get(_this.lobby_popup_betHistory)
                    .to({
                       y:480
                    },100, createjs.Ease.quadIn)
                    .call(() => {
                    })
                } else {
                    createjs.Tween.get(transHistory.children[0])
                    // createjs.Tween.get(_this.lobby_popup_betHistory)
                    .to({
                        y:-80
                    },100, createjs.Ease.quadOut)
                    .call( (e)=>{
                        e.visible = false;
                    },[transHistory.children[0]])
                    .call(() =>{
                        $("#transHistory").hide();
                    })
                }

                _this.lobby_popup_transactions.initRecords();
                transHistory.visible = true;
                _this.lobby_popup_transactions.visible = true;

                // createjs.Tween.get(_this.lobby_popup_transactions)
                // .to({
                //    y:570
                // },100, createjs.Ease.quadIn)

                break;
            case "action_logout" :
                    _this.hidePopups();
                    _this.lobby_header.toggleGamePlay = true;
                    confirmationModal.children[0].visible = true;
                    _this.confirmation_modal.redirectCasinoPage();
                    $("#confirmationModal").show();
                    $(".popup-settings-container").hide()
                break;
        }
    },
    hidePopups () {

        $(".popup-settings-container").hide()
        $("#betHistory").hide();
        $("#transHistory").hide();
        $("#popupHowto").hide();
        $("#popupSettings").hide();
        $("#sicbo-toggle, #poker-toggle, #baccarat-toggle, #dragontiger-toggle, #red-white-toggle, #roulette-toggle, #bigwheel-toggle")
            .css("display","none");

        let toHide = [transHistory.children[0], betHistory.children[0], popupHowto.children[0], popupSettings.children[0]];
        toHide.forEach((obj, x) => {
            let val = -80;
            if(x == 3){
                val = -150
            }
            if(obj.visible) {
                createjs.Tween.get(obj)
                .to({
                    y : val
                },100, createjs.Ease.quadOu)
                .call((e) => {
                    e.visible = false
                },[obj])
            }
        })
    },
    toggleWinpopup (view_name) {

        switch(view_name)
        {
            case 'main' :
            $('#winPopGame').hide();
            break;
            case 'live_games' :
            $('#winPop').hide();
            break;
            case 'themed_games' :
            $('#winPop').hide();
            break;
        }
    },
    hideAll() {
        $("#popupHowto").hide();
        $(".header-subnav__items").removeClass("active");
        _this.confirmation_modal.visible = false;
        _this.lobby_main.visible = false;
        _this.lobby_liveGames.visible = false;
        _this.lobby_themedGames.visible = false;
        _this.lobby_reelGames.visible = false;

        _this.lobby_baccaratTables.visible = false;
        _this.lobby_liveGames.visible = false;
        _this.lobby_pokerTables.visible = false;
        _this.lobby_sicboTables.visible = false;
        _this.lobby_dragonTigerTables.visible = false;
        _this.lobby_roulleteTables.visible = false;

        _this.lobby_pulaputiTables.visible = false;
        _this.lobby_bigWheelTables.visible = false;

        $("#popupSettings").hide();
        $("#bannerCanvas").hide()
        $("#hot").hide()
        $("#confirmationModal").hide();
    },
    getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
});
