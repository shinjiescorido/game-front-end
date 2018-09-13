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
                window.videoStream = document.getElementById(playerId);
                window.videoStream.addEventListener("mediaError", function(){
                    console.log('media error', arguments.callee.name, arguments);
                    try{
                        window.videoStream.play2();
                    }
                    catch(e){
                        console.log(e);
                    }
                });

                $('.osmf-video').css('opacity', '1');
                break;

            // player state change
            case "ready":
            case "loading":
            case "playing":
                window.setVideoVol();
                break;
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
        $(".get-flash").css('display', 'none')
    }

    var flashvars = {
        src: window.videostream_url,
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
        volume: 60,
        muted: false,
    };
    var attrs = {
        name: "player",
        class: "osmf-video",
    };

    window.flashvars = flashvars;
    window.params = params;
    window.attrs = attrs;

    var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

    if( !isFirefox ){
        swfobject.embedSWF("/osmf/GrindPlayer.swf", "player", "1920", "1080", "10.2", null, flashvars, params, attrs);
    }

    $(".refresh_test").on("click", function() {
        console.log(window.videoStream)
        window.videoStream && window.videoStream.load();
    });
});