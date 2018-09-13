export default(table_name,table) => {
	let opposites = {
		"bonus" : 1,
		"ante" : 0
	}

	let condition = false;
	switch(table_name) {
		case "bonusplus" :
		case "bonus" :
			if(!table[opposites.ante].chips.length) {
				condition = true;
			}
			break;
	}
	return condition;

}