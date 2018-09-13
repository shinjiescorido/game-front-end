export default(table_name,table) => {

	let multiplayer = table[0].parent.parent.multiplayer;

	let opposites = {
		"dragon_even" : multiplayer ? 24 : 0 ,
		"dragon_odd" : multiplayer ? 25 : 1,
		"dragon_big" : multiplayer ? 26 : 2,
		"dragon_small" : multiplayer ? 27 : 3,
		"dragon_clubs" : 4,
		"dragon_hearts" : 9,
		"dragon" : multiplayer ? 23 : 5,
		"dragon_spades" : 6,
		"dragon_diamonds" : 7,
		"tiger" : multiplayer ? 20 : 10,
		"tiger_diamonds" : 11,
		"tiger_spades" : 12,
		"tiger_even" : multiplayer ? 31 : 13,
		"tiger_odd" : multiplayer ? 30 : 14,
		"tiger_big" : multiplayer ? 29 : 15,
		"tiger_small" : multiplayer ? 28 : 16,
		"tiger_hearts" : 19,
		"tiger_clubs" : 17,
	}

	let condition = false;
	switch(table_name) {
		case "dragon" :
			if(table[opposites.tiger].chips.length) {
				condition = true;
			}
			break;
		case "tiger" :
			if(table[opposites.dragon].chips.length) {
				condition = true;
			}
			break;

		/****/
		case "dragon_even" :
			if(table[opposites.dragon_odd].chips.length) {
				condition = true;
			}
			break;
		case "dragon_odd" :
			if(table[opposites.dragon_even].chips.length) {
				condition = true;
			}
			break;
		/****/
		case "dragon_small" :
			if(table[opposites.dragon_big].chips.length) {
				condition = true;
			}
			break;
		case "dragon_big" :
			if(table[opposites.dragon_small].chips.length) {
				condition = true;
			}
			break;

		/****/
		case "tiger_even" :
			if(table[opposites.tiger_odd].chips.length) {
				condition = true;
			}
			break;
		case "tiger_odd" :
			if(table[opposites.tiger_even].chips.length) {
				condition = true;
			}
			break;

		/****/
		case "tiger_small" :
			if(table[opposites.tiger_big].chips.length) {
				condition = true;
			}
			break;
		case "tiger_big" :
			if(table[opposites.tiger_small].chips.length) {
				condition = true;
			}
			break;

		/****/
		case "dragon_hearts" :
			if(table[opposites.dragon_diamonds].chips.length) {
				condition = true;
			}
			break;
		case "dragon_diamonds" :
			if(table[opposites.dragon_hearts].chips.length) {
				condition = true;
			}
			break;

		/****/
		case "dragon_clubs" :
			if(table[opposites.dragon_spades].chips.length) {
				condition = true;
			}
			break;
		case "dragon_spades" :
			if(table[opposites.dragon_clubs].chips.length) {
				condition = true;
			}
			break;

		/****/
		case "tiger_hearts" :
			if(table[opposites.tiger_diamonds].chips.length) {
				condition = true;
			}
			break;
		case "tiger_diamonds" :
			if(table[opposites.tiger_hearts].chips.length) {
				condition = true;
			}
			break;

		/****/
		case "tiger_clubs" :
			if(table[opposites.tiger_spades].chips.length) {
				condition = true;
			}
			break;
		case "tiger_spades" :
			if(table[opposites.tiger_clubs].chips.length) {
				condition = true;
			}
			break;

		/****/
		// case "dragon_spades" :
		// 	if(table[opposites.tiger_spades].chips.length) {
		// 		condition = true;
		// 	}
		// 	break;
		// case "tiger_spades" :
		// 	if(table[opposites.dragon_spades].chips.length) {
		// 		condition = true;
		// 	}
		// 	break;

		// /****/
		// case "dragon_hearts"  :
		// 	if(table[opposites.tiger_hearts].chips.length) {
		// 		condition = true;
		// 	}
		// 	break;
		// case "tiger_hearts" :
		// 	if(table[opposites.dragon_hearts].chips.length) {
		// 		condition = true;
		// 	}
		// 	break;

		// /****/
		// case "dragon_spades" :
		// 	if(table[opposites.tiger_spades].chips.length) {
		// 		condition = true;
		// 	}
		// 	break;
		// case "tiger_spades" :
		// 	if(table[opposites.dragon_spades].chips.length) {
		// 		condition = true;
		// 	}

		// 	break;
		// /****/
		// case "dragon_diamonds"  :
		// 	if(table[opposites.tiger_diamonds].chips.length) {
		// 		condition = true;
		// 	}
		// 	break;
		// case "tiger_diamonds" :
		// 	if(table[opposites.dragon_diamonds].chips.length) {
		// 		condition = true;
		// 	}
		// 	break;
		// /****/
		// case "dragon_clubs"  :
		// 	if(table[opposites.tiger_clubs].chips.length) {
		// 		condition = true;
		// 	}
		// 	break;
		// case "tiger_clubs" :
		// 	if(table[opposites.dragon_clubs].chips.length) {
		// 		condition = true;
		// 	}
		// 	break;
	}

	return condition;

}
