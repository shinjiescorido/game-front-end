import { playSound } from '../factories/factories';
import lobby_header from '../components/mobile/lobby_header';
import subHeader from '../components/mobile/lobby_liveGames_subHeader';
import themed_subHeader from '../components/mobile/lobby_themedGames_subheader';
import reel_subHeader from '../components/mobile/lobby_reelGames_subheader';

export default new blu.Screen({
    lobby_header: lobby_header(),
    lobby_liveGames_subHeader : subHeader(),
    lobby_themedGames_subHeader : themed_subHeader(),
    lobby_reelGames_subHeader : reel_subHeader(),

    resources: "/lobby-mobile.json",
    init () {
        $.get('/kaga/list', {}, (response)=> {
            ka_games = response.games;
        });

        this.stage.resize(window.innerWidth, window.innerHeight);
    },
    loaded_asset: function (e) {
        this.loaded = e;
    },
    loading: function(e) {

    },
    is_mobile : true,
    main() {

        this.addComponent(this.lobby_header);
        this.addComponent(this.lobby_liveGames_subHeader); //subheader
        this.addComponent(this.lobby_themedGames_subHeader); //subheader
        this.addComponent(this.lobby_reelGames_subHeader); //subheader

        __global.lobby_header = this.lobby_header;
        __global.livegames_subheader = this.lobby_liveGames_subHeader;
        __global.themed_subheader = this.lobby_themedGames_subHeader;
        __global.reel_subheader = this.lobby_reelGames_subHeader;

        let inGame = this.getParameterByName('game');
        // if (!inGame) {
            setTimeout(() => {
                playSound('welcome');
            }, 2000);
        // }
    },
    toggleView (view_name) {
        $(".tables-container").css("overflow", "scroll");
        toggleView(view_name);

         switch(view_name) {
            case "main" :
                this.lobby_liveGames_subHeader.visible = false;
                this.lobby_themedGames_subHeader.visible = false;
                this.lobby_reelGames_subHeader.visible = false;

                break;
            case "live_games" :
                this.lobby_liveGames_subHeader.sub_header_baccarat.active(this.lobby_liveGames_subHeader.sub_header_baccarat);
                this.lobby_liveGames_subHeader.visible = true;
                this.lobby_themedGames_subHeader.visible = false;
                this.lobby_reelGames_subHeader.visible = false;
                break;
            case "themed_games" :
                this.lobby_liveGames_subHeader.visible = false;
                this.lobby_themedGames_subHeader.visible = true;
                this.lobby_reelGames_subHeader.visible = false;
                //Set active sub header
                //this.lobby_themedGames_subHeader.sub_header_allGames.active(this.lobby_themedGames_subHeader.sub_header_allGames);
                this.lobby_themedGames_subHeader.sub_header_redwhite.active(this.lobby_themedGames_subHeader.sub_header_redwhite);
                this.lobby_themedGames_subHeader.sub_header_spinwin.normal(this.lobby_themedGames_subHeader.sub_header_spinwin);
                break;
            case "howtoplay":
                this.lobby_liveGames_subHeader.visible = false;
                this.lobby_themedGames_subHeader.visible = false;
                break;
            case "reel_games":
                this.lobby_reelGames_subHeader.visible = true;
                this.lobby_reelGames_subHeader.allgames.active(this.lobby_reelGames_subHeader.allgames);
                this.lobby_reelGames_subHeader.betsoft.normal(this.lobby_reelGames_subHeader.betsoft);
                this.lobby_reelGames_subHeader.kagaming.normal(this.lobby_reelGames_subHeader.kagaming);
                this.lobby_liveGames_subHeader.visible = false;
                this.lobby_themedGames_subHeader.visible = false;
                break;

            case "thumbnail_bethistory" :
                this.lobby_liveGames_subHeader.visible = false;
                this.lobby_themedGames_subHeader.visible = false;
                this.lobby_reelGames_subHeader.visible = false;
                break;

            case "thumbnail_transactions" :
                this.lobby_liveGames_subHeader.visible = false;
                this.lobby_themedGames_subHeader.visible = false;
                this.lobby_reelGames_subHeader.visible = false;
                break;
        }
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
