//*** sample here ***//
$("#maintenance").on("click", ()=>{
  instance.setMaintenance({
    gameName : "Baccarat",
    tableId : "2",
    data: {"status":1,"slave":"supersix","division":"Periodic","start_time":"2018-02-15 10:00","end_time":"2018-02-15 18:00","main_text":"1","sub_text":"1"}
  });
  instance.setMaintenance({
    gameName : "Dragon-Tiger",
    tableId : "2",
    data: {"status":0,"slave":"all","division":"Periodic","start_time":"2018-02-15 10:00","end_time":"2018-02-15 18:00","main_text":"1","sub_text":"1"}
  });
  instance.setMaintenance({
    gameName : "Dragon-Tiger",
    tableId : "1",
    data: {"status":1,"slave":"all","division":"Periodic","start_time":"2018-02-15 10:00","end_time":"2018-02-15 18:00","main_text":"1","sub_text":"1"}
  });

  instance.setMaintenance({
    gameName : "Poker",
    tableId : "1",
    data: {"status": 0,"slave": "all","division":"Periodic","start_time":"2018-02-15 10:00","end_time":"2018-02-15 18:00","main_text":"1","sub_text":"1"}
  });
});

$("#shoechangeDT").on("click", ()=>{
  instance.shoechange({tableId : "1", gameName : 'Dragon-Tiger'})
});

$("#shoechangeBC").on("click", ()=>{
  instance.shoechange({tableId : "2", gameName : 'Baccarat'})
});
$("#modDT").on("click", ()=>{
  instance.displaymodify({
    tableId : "1", 
    gameName : 'Dragon-Tiger',
    data : {
      mark : [{
        "num": 9,
        "mark": "h"
      }, {
        "num": 11,
        "mark": "m"
      }, {
        "num": 9,
        "mark": "h"
      }, {
        "num": 7,
        "mark": "j"
      }]
    }
  })
});


$("#modBC").on("click", ()=>{
  instance.displaymodify({
    tableId : "9", 
    gameName : 'Baccarat',
    data : {
      mark : [{"num":7,"mark":"p","natural":[]},{"num":8,"mark":"b","natural":["banker"]},{"num":7,"mark":"b","natural":[]}]
    }
  })
});

$("#modBC").on("click", ()=>{
  instance.displaymodify({
    tableId : "9", 
    gameName : 'Baccarat',
    data : {
      mark : [{"num":7,"mark":"p","natural":[]},{"num":8,"mark":"b","natural":["banker"]},{"num":7,"mark":"b","natural":[]}]
    }
  })
});

$("#modSB").on("click", ()=>{
  instance.displaymodify({
    tableId : "1", 
    gameName : 'Sicbo',
    data : {
      mark : {"game_info":"{\"one\":\"1\",\"two\":\"3\",\"three\":\"5\"}"}
    }
  })
});

$("#dealerchange").on("click", ()=>{
  instance.setDealer({
      "gameName": "Poker",
      "roundId": 39420,
      "roundNum": 77098,
      "eventName": "dealerchange",
      "tableId": "1",
      "dealerId": 86,
      "dealerCode": "D0008",
      "dealerName": "Kaye",
      "dealerImage": "https://nihtan-cdn.s3-ap-northeast-1.amazonaws.com/dealers/fj5KcG0sibNVFD5z9gAX82nk0fR5aHaG1lKzmonY.png",
      "tableImage": null
    })
});

//end sample here
//
//
    <div class="simulator-container">
      <button id='maintenance'>maintenance</button>
      <button id='shoechangeDT'>shoechangeDT</button>
      <button id='shoechangeBC'>shoechangeBC</button>
      <button id='modBC'>displaymod BC</button>
      <button id='modDT'>displaymod DT</button>
      <button id='modSB'>displaymod SICBO</button>
      <button id='modPK'>displaymod POKER</button>
      <button id='dealerchange'>change dealer</button>
    </div>