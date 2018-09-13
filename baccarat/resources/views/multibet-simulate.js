        $("#join1").on('click', ()=>{
                let joindata = {
                            "type": "join",
                            "data": {
                                "name": "PH516",
                                "userId": 1175,
                                "bets": {
                                    "25-500": {
                                        "334284": [{
                                            "roundNum": 334284,
                                            "bet_amount": 500,
                                            "name": "PH516",
                                            "id": 1175,
                                            "bet": "player",
                                            "is_mobile": true,
                                            "currency": "SS",
                                            "slave": "normal",
                                            "currencyMultiplier": 1,
                                            "userMultiplier": 1
                                        }, {
                                            "roundNum": 334284,
                                            "bet_amount": 62,
                                            "name": "PH516",
                                            "id": 1175,
                                            "bet": "tie",
                                            "is_mobile": true,
                                            "currency": "SS",
                                            "slave": "normal",
                                            "currencyMultiplier": 1,
                                            "userMultiplier": 1
                                        }]
                                    }
                                }
                            }
                        }
            this.component_multiplayer.roomEvent(joindata);
            this.component_firstViewMultiplayer.roomEvent(joindata);
        });

         $("#join2").on('click', ()=>{
                let joindata = {
                            "type": "join",
                            "data": {
                                "name": "PH7888",
                                "userId": 1226,
                                "bets": {
                                    "25-500": {
                                        "334284": [{
                                            "roundNum": 334284,
                                            "bet_amount": 500,
                                            "name": "PH7888",
                                            "id": 1226,
                                            "bet": "player",
                                            "is_mobile": true,
                                            "currency": "SS",
                                            "slave": "normal",
                                            "currencyMultiplier": 1,
                                            "userMultiplier": 1
                                        }, {
                                            "roundNum": 334284,
                                            "bet_amount": 62,
                                            "name": "PH7888",
                                            "id": 1226,
                                            "bet": "tie",
                                            "is_mobile": true,
                                            "currency": "SS",
                                            "slave": "normal",
                                            "currencyMultiplier": 1,
                                            "userMultiplier": 1
                                        }]
                                    }
                                }
                            }
                        }
            this.component_multiplayer.roomEvent(joindata);
            this.component_firstViewMultiplayer.roomEvent(joindata);
        });

        $("#bet1").on("click", () => {
            let betdata = {
                "id": 1175,
                "seat": 4,
                "type": "bet",
                "data": [{
                    "roundNum": 338800,
                    "bet_amount": 60000,
                    "name": "PH7888",
                    "id": 1175,
                    "bet": "player",
                    "is_mobile": true,
                    "currency": "N",
                    "slave": "normal",
                    "currencyMultiplier": 1000,
                    "userMultiplier": 1
                }, {
                    "roundNum": 338803,
                    "bet_amount": 60000,
                    "name": "PH7888",
                    "id": 1175,
                    "bet": "tie",
                    "is_mobile": true,
                    "currency": "N",
                    "slave": "normal",
                    "currencyMultiplier": 1000,
                    "userMultiplier": 1
                }]
            }

            this.component_multiplayer.setMultiplayer(_.cloneDeep(betdata));
            this.component_firstViewMultiplayer.setMultiplayer(_.cloneDeep(betdata));
        });

        $("#bet2").on("click", () => {
            let betdata = {
                "id": 1226,
                "seat": 4,
                "type": "bet",
                "data": [{
                    "roundNum": 338800,
                    "bet_amount": 60000,
                    "name": "PH7888",
                    "id": 1226,
                    "bet": "player",
                    "is_mobile": true,
                    "currency": "N",
                    "slave": "normal",
                    "currencyMultiplier": 1000,
                    "userMultiplier": 1
                }, {
                    "roundNum": 338803,
                    "bet_amount": 60000,
                    "name": "PH7888",
                    "id": 1226,
                    "bet": "tie",
                    "is_mobile": true,
                    "currency": "N",
                    "slave": "normal",
                    "currencyMultiplier": 1000,
                    "userMultiplier": 1
                }]
            }

            this.component_multiplayer.setMultiplayer(_.cloneDeep(betdata));
            this.component_firstViewMultiplayer.setMultiplayer(_.cloneDeep(betdata));
        });

          $("#newround").on("click", ()=> {
           newround({roundNum:111});
           startBetting({
             bettingTime : 20,
             type : 'startround'
           })
          });



        <button id="join1" style="position: absolute;z-index: 999999999; "> Join 1</button>
        <button id="join2" style="position: absolute;z-index: 999999999; left: 60px"> JOIN 2</button>
        <button id="bet1" style="position: absolute;z-index: 999999999; left: 120px"> BET 1</button>
        <button id="bet2" style="position: absolute;z-index: 999999999; left: 180px">BET 2</button>
        <button id="newround" style="position: absolute;z-index: 999999999; left: 260px">NEWROUND</button>
