/**
 * COMPONENT VIDEO STREAM
 * -GAME VIDEO STREAMING
 */
$(document).ready(function(){
    // SICBO.components = SICBO.components || {};
    function onJSBridge(playerId, event, data) {
        switch(event) {
            case "onJavaScriptBridgeCreated":
                // reference to player
                var videoStream = document.getElementById(playerId);
                videoStream.addEventListener("mediaError", function(){
                    console.log('media error', arguments.callee.name, arguments);
                    try{
                        videoStream.play2();
                    }
                    catch(e){
                        console.log(e);
                    }
                });
                break;

            // player state change
            case "ready":
            case "loading":
            case "playing":
            case "paused":
            case "buffering":

            // other events
            case "mediaSize":
            case "seeking":
            case "seeked":
            case "volumeChange":
            case "durationChange":
            case "timeChange":
            case "progress": // for progressive download only
            case "complete":
            case "advertisement":

            default:
                // console.log(event, data);
                break;
        }
    }

    var flashvars = {
        src: "http://d556i00mq0ud2.cloudfront.net/Poker01/video/playlist.m3u8",
        plugin_m3u8: "/osmf/flashlsOSMF.swf", //"OSMFHLSPlugin.swf"
        controlBarAutoHide : true,
        javascriptCallbackFunction: onJSBridge,
        muted: false,
        autoPlay: true,
    };
    var params = {
        allowFullScreen: false,
        allowScriptAccess: "always",
        bgcolor: "#000000",
        volume: 50,
        muted: false,
    };
    var attrs = {
        name: "player",
        class: "osmf-video",
    };

    var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

    if( !isFirefox ){
        swfobject.embedSWF("/osmf/GrindPlayer.swf", "player", "1920", "1080", "10.2", null, flashvars, params, attrs);
    }

});
