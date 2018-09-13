export default(table_name,table) => {

	return false;
	
	let multiplayer = table[0].parent.parent.multiplayer;

	let opposites = {
		"player" : [1, 6, 12, 17],
		"banker" : [3, 8, 14, 19]
	}

	let condition = false;
	// if(table[opposites.player].chips.length)

	let bankerchips = [];
	let playerchips = [];
	opposites.player.forEach((x) => {
		playerchips.push(table[x].chips.length)
	});
	opposites.banker.forEach((x) => {
		bankerchips.push(table[x].chips.length)
	});

	switch(table_name) {
		case "banker" :

			if(_.filter(playerchips, function (e) {return e}).length) {
				condition = true
			}
			break;
		case "player" :
			if(_.filter(bankerchips, function (e) {return e}).length) {
				condition = true;
			}
			break;
		case "bankerpair" :
		case "playerpair" :
		case "tie" :
		case "supersix" :
			if( !_.filter(bankerchips, function (e) {return e}).length && !_.filter(playerchips, function (e) {return e}).length )
				condition = true;
			break;
	}

	return condition;

}
