export default(table_name,table) => {

	let multiplayer = table[0].parent.parent.multiplayer;

	let opposites = {
		"playerpair" : !multiplayer ?  0 : 13,
		"player" : !multiplayer ?  1 : 10,
		"tie" : !multiplayer ? 2 : 12,
		"banker" : !multiplayer ? 3 : 11,
		"bankerpair" : !multiplayer ? 4 : 14,
		"supersix" : !multiplayer ? 5 : 15,
		"big" : !multiplayer ? 6 : 16,
		"small" : !multiplayer ? 7 : 17,
		"bonus_player" : !multiplayer ? 8 : 18,
		"bonus_banker" : !multiplayer ? 9 : 19
	}

	let condition = false;
	// if(table[opposites.player].chips.length)

	switch(table_name) {
		case "banker" :
			if(table[opposites.player].chips.length) {
				condition = true;
			}
			break;
		case "player" :
			if(table[opposites.banker].chips.length) {

				condition = true;
			}
			break;
		/****/
		case "tie" :
		case "supersix" :
		case "bankerpair" :
		case "playerpair" :
			if(!table[opposites.banker].chips.length && !table[opposites.player].chips.length) {
				condition = true;
			}
			break;
		case "big" :
			if(!(table[opposites.player].chips.length || table[opposites.banker].chips.length) || table[opposites.small].chips.length) {
				condition = true;
			}
			break;
		case "small" :
			if(!(table[opposites.banker].chips.length || table[opposites.player].chips.length) || table[opposites.big].chips.length) {
				condition = true;
			}
			break;
		case "bonus_player" :
			if(!table[opposites.player].chips.length || table[opposites.banker].chips.length) {
				condition = true;
			}
			break;
		case "bonus_banker" :
			if(!table[opposites.banker].chips.length || table[opposites.player].chips.length) {
				condition = true;
			}
			break;
	}

	return condition;

}
