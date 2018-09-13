Vue.component('betrecords', {
    data () {
        return {
            transferlogs: window.transferlogs,
            transferlogs_store: {},
            betlogs: window.betlogs,
            betlogs_store: {},
            gamehistory: window.gamehistory,
            gamehistory_store: {}
        }
    },
    ready(){

    },
    methods: {
        showdetails (data) {
        	$(".txtheader").html("GAME NO:"+data.room_code+" ("+data.created_at+")")
        	$("#vwdetails").show();
        }
        // formatNumber: function(number){
        //              number = parseInt(number) || 0;
        //              return number.toLocaleString('en');
        //          },

    }
});

new Vue({
  el: 'body'
})
