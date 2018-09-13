
export default (self) => {
	var socket = io.connect('http://10.1.10.12:8001/dragontiger', { 'transports': ['websocket'] });
	let card_data = {};
	let card = '';
	let round_id = '';
	//positions card
	let dragonX = 0;
	let tigerX = 0;

	let dragonY = 0;
	let tigerY = 0;

    let refresh_card  = {};


	let setCardPositions = () => {
    	if (self.mobile) {
			dragonX = 50;
			dragonY = 130 +150;
			tigerX = 50;
			tigerY = 270 + 150;
		} else {
			dragonX = 80 + 1390;
			dragonY = 175;
			tigerX = 80+205 + 1390;
			tigerY = 175;
		}

		if (self.component_card_result.dragon) {
			self.component_card_result.dragon[0].x = dragonX;
			self.component_card_result.dragon[0].y = dragonY;
		}

		if (self.component_card_result.tiger) {
			self.component_card_result.tiger[0].x = tigerX;
			self.component_card_result.tiger[0].y = tigerY;
		}
    }

	socket.on('swipecard',(data)=>{

		card_data = refresh_card;

		switch(data.card.value) {
			case 11:
				card = 'J'+ data.card.suite[0].toUpperCase();
				break;
			case 12:
				card = 'Q'+ data.card.suite[0].toUpperCase();
				break;
			case 13:
				card = 'K'+ data.card.suite[0].toUpperCase();
				break;
			default:
				card = data.card.value+ data.card.suite[0].toUpperCase()
		}

		card_data[data.hand] = [card];

		if (self.component_card_result_total) {
			if (data.hand == "dragon") {
				self.component_card_result_total.setDragonValue(data.card.value);
			}
			if (data.hand == "tiger") {
				self.component_card_result_total.setTigerValue(data.card.value);
			}
		}

		self.component_card_result.drawCards(card_data);

		setCardPositions();
	});

	socket.on('displayresults', (data)=>{

		let card_result = {};
		let dragon = '';
		let tiger = ''

		switch(data.dragon.value) {
			case 11:
				dragon = 'J'+ data.dragon.suite[0].toUpperCase();
				break;
			case 12:
				dragon = 'Q'+ data.dragon.suite[0].toUpperCase();
				break;
			case 13:
				dragon = 'K'+ data.dragon.suite[0].toUpperCase();
				break;
			default:
				dragon = data.dragon.value + data.dragon.suite[0].toUpperCase();
		}


		switch(data.tiger.value) {
			case 11:
				tiger = 'J'+ data.tiger.suite[0].toUpperCase();
				break;
			case 12:
				tiger = 'Q'+ data.tiger.suite[0].toUpperCase();
				break;
			case 13:
				tiger = 'K'+ data.tiger.suite[0].toUpperCase();
				break;
			default:
				tiger = data.tiger.value + data.tiger.suite[0].toUpperCase();
		}

		card_result = {
			"dragon" : [dragon],
			"tiger" : [tiger]
		}

		if (self.component_card_result_total) {
			self.component_card_result_total.setDragonValue(data.dragon.value);
			self.component_card_result_total.setTigerValue(data.tiger.value);
		}

		self.component_card_result.drawCards(card_result)
		self.component_card_result.setCardResult(card_result)

		setCardPositions();

		let winning_arr = [];

		if(data.winner != "tie") {
			if (parseInt(data[data.winner].value) % 2 == 0) {
				winning_arr.push(data.winner+"_even")
			} else {
				winning_arr.push(data.winner+"_odd")
			}

			if (parseInt(data[data.winner].value) < 7) {
				winning_arr.push(data.winner+"_small")
			} else {
				winning_arr.push(data.winner+"_big")
			}
			winning_arr.push(data.winner+"_"+ data[data.winner].suite);
			winning_arr.push(data.winner);
		}

		if (data.winner =="tie") {
			winning_arr = [data.winner];
		}

		if (!self.component_winnings.visible) {

			self.component_winnings.showWinAnimation(data.winner);
			self.component_winning_assets.visible = 1;
			self.component_betBoard.tableWinning(winning_arr);
			self.component_winAmount.calculateWin(winning_arr,card_result);

		}else {
			self.component_winnings.visible = 0;
		}

	});

	socket.on('newround', (data) => {
    	self.component_dealer.setRound(data.roundId);
		self.component_timer.startTime(30);
		self.initRound();
		refresh_card = {};
		card_data = {};
	});

	socket.on('command', (e) => {
		if (e.action == 'stoptimer') {
			self.component_timer.timer_instance.visible = false;
		}

		if (e.action == 'deletecard') {
			self.component_card_result.deleteCard(e.hand);
		}
	});

	socket.on("dealerchange", (data) => {
		self.component_dealer.setDealer(data)
	});

	let data = {};

	socket.emit('init', { userid : 39, tableid : 2 } );
	 socket.emit('jointable', 2, function ( data ) {
	});

    socket.on('activerounddatas',(data)=>{
    	self.component_dealer.setRound(data.round_id);
    	let tiger = '';
    	let dragon = '';
    	if (!_.isEmpty(data.tiger)) {
	    	switch(data.tiger.value) {
				case 11:
					tiger = 'J'+ data.tiger.suite[0].toUpperCase();
					break;
				case 12:
					tiger = 'Q'+ data.tiger.suite[0].toUpperCase();
					break;
				case 13:
					tiger = 'K'+ data.tiger.suite[0].toUpperCase();
					break;
				default:
					tiger = data.tiger.value + data.tiger.suite[0].toUpperCase()
			}
			refresh_card['tiger'] = [tiger]
		}

    	if (!_.isEmpty(data.dragon)) {

			switch(data.dragon.value) {
				case 11:
					dragon = 'J'+ data.dragon.suite[0].toUpperCase();
					break;
				case 12:
					dragon = 'Q'+ data.dragon.suite[0].toUpperCase();
					break;
				case 13:
					dragon = 'K'+ data.dragon.suite[0].toUpperCase();
					break;
				default:
					dragon = data.dragon.value + data.dragon.suite[0].toUpperCase()
			}

			refresh_card["dragon"] = [dragon]
		}

		if ((!_.isEmpty(data.dragon) && _.isEmpty(data.tiger) ) || (_.isEmpty(data.dragon) && !_.isEmpty(data.tiger)) ) {
			self.component_card_result.drawCards(refresh_card);
		}

		if (!_.isEmpty(data.dragon) && !_.isEmpty(data.tiger)) {
			self.component_card_result.drawCards(refresh_card);
			self.component_card_result.setCardResult(refresh_card);
		}


		if (self.component_card_result_total) {
			self.component_card_result_total.setDragonValue(data.dragon.value);
			self.component_card_result_total.setTigerValue(data.tiger.value);
		}

		setCardPositions();
    });

}