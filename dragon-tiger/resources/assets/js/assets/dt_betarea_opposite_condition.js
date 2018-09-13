export default(table_name,table) => {
	let multiplayer = table[0].parent.parent.multiplayer;
	let opposites = {
		"dragon_even" : multiplayer ? 20 : 0 ,
		"dragon_odd" : multiplayer ? 21 : 1,
		"dragon_big" : multiplayer ? 22 : 2,
		"dragon_small" : multiplayer ? 23 : 3,
		"dragon_clubs" : 4,
		"dragon_hearts" :5 ,
		"dragon" : multiplayer ? 26 : 6,
		"dragon_spades" :7,
		"dragon_diamonds" :8,
		"tiger" : multiplayer ? 27 : 11,
		"tiger_diamonds" : 12,
		"tiger_spades" : 13,
		"tiger_even" : multiplayer ? 31 : 14,
		"tiger_odd" : multiplayer ? 30 : 15,
		"tiger_big" : multiplayer ? 29 : 16,
		"tiger_small" : multiplayer ? 28 : 17,
		"tiger_hearts" : 18,
		"tiger_clubs" : 19,
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
