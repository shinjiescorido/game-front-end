export default(table_name,table) => {
	let opposites = {
		"dragon" : 0,
		"tiger" : 10,
		"dragon_even" : 4,
		"tiger_even" : 13,
		"dragon_odd" : 6,
		"tiger_odd" : 14,
		"dragon_big" : 1,
		"tiger_big" : 12,
		"dragon_small" : 7,
		"tiger_small" : 15,
		"dragon_clubs" : 2,
		"tiger_clubs" : 17,
		"dragon_hearts" :5 ,
		"tiger_hearts" : 16,
		"dragon_spades" :8,
		"tiger_spades" : 18,
		"dragon_diamonds" :3,
		"tiger_diamonds" : 11
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
			if(table[opposites.tiger_even].chips.length) {
				condition = true;
			}
			break;
		case "tiger_even" :
			if(table[opposites.dragon_even].chips.length) {
				condition = true;
			}
			break;
		/****/
		case "dragon_small" :
			if(table[opposites.tiger_small].chips.length) {
				condition = true;
			}
			break;
		case "tiger_small" :
			if(table[opposites.dragon_small].chips.length) {
				condition = true;
			}
			break;

		/****/
		case "dragon_odd" :
			if(table[opposites.tiger_odd].chips.length) {
				condition = true;
			}
			break;
		case "tiger_odd" :
			if(table[opposites.dragon_odd].chips.length) {
				condition = true;
			}
			break;

		/****/
		case "dragon_big" :
			if(table[opposites.tiger_big].chips.length) {
				condition = true;
			}
			break;
		case "tiger_big" :
			if(table[opposites.dragon_big].chips.length) {
				condition = true;
			}
			break;

		/****/
		case "dragon_spades" :
			if(table[opposites.tiger_spades].chips.length) {
				condition = true;
			}
			break;
		case "tiger_spades" :
			if(table[opposites.dragon_spades].chips.length) {
				condition = true;
			}
			break;

		/****/
		case "dragon_hearts"  :
			if(table[opposites.tiger_hearts].chips.length) {
				condition = true;
			}
			break;
		case "tiger_hearts" :
			if(table[opposites.dragon_hearts].chips.length) {
				condition = true;
			}
			break;

		/****/
		case "dragon_spades" :
			if(table[opposites.tiger_spades].chips.length) {
				condition = true;
			}
			break;
		case "tiger_spades" :
			if(table[opposites.dragon_spades].chips.length) {
				condition = true;
			}

			break;
		/****/
		case "dragon_diamonds"  :
			if(table[opposites.tiger_diamonds].chips.length) {
				condition = true;
			}
			break;
		case "tiger_diamonds" :
			if(table[opposites.dragon_diamonds].chips.length) {
				condition = true;
			}
			break;
		/****/
		case "dragon_clubs"  :
			if(table[opposites.tiger_clubs].chips.length) {
				condition = true;
			}
			break;
		case "tiger_clubs" :
			if(table[opposites.dragon_clubs].chips.length) {
				condition = true;
			}
			break;
	}

	return condition;

}