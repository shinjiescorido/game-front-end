

const bc_opposite = (target, area) => {
	
	let opposite = {
		"banker" : "player",
		"player" : "banker",
		"big" : "small",
		"bonus_player" : "banker",
		"bonus_banker" : "player"
	}

	let condition = false;

	let banker  = _.find(target.betarea, function (e) {return e.table === 'banker'});		
	let player  = _.find(target.betarea, function (e) {return e.table === 'player'});

	if(area.table === "tie" || area.table === "supersix") {
		if(!banker.chips.length && !player.chips.length) condition = true;
		else condition = false;		
	} else {
		let betarea =  _.find(target.betarea, function (e) {return e.table === opposite[area.table]});
		if(betarea.chips.length) {
			condition = true;
		}
	}

	if (area.table.indexOf('bonus') > -1) {
		if(area.table === 'bonus_banker') {
			if(!banker.chips.length) condition = true;
		} else {
			if(!player.chips.length) condition = true;
		}
	}

	return condition;
}


const dt_opposite = (target, area) => {
	let opposite = {
		"dragon" : "tiger",
		"tiger" : "dragon"
	}

	let condition = false;
	let betarea =  _.find(target.betarea, function (e) {return e.table === opposite[area.table]});

	if(area.table === "tie" || area.table === "suited_tie") {
		 condition = false;		
	} else {
		if(betarea.chips.length) {
			condition = true;
		}
	}

	return condition;
}

const sb_opposite = (target, area) => {
	let opposite = {
		"small" : "big",
		"big" : "small",
		"odd" : "even",
		"even" : "odd"
	}

	let condition = false;

	let betarea =  _.find(target.betarea, function (e) {return e.table === opposite[area.table]});
	
	if(area.table === "anytriple") {
		condition = false;
	} else {
		if(betarea.chips.length) {
			condition = true;
		}
	}

	return condition;
}

const poker_opposite = (target, area) => {

	let opposite = {
		"ante" : 0,
		"bonus" : 1,
		"bonusplus" : 2,
		"pocket" : 3
	}

	let condition = false;
	switch(area.table) {
		case "bonus" :
			if(!target.betarea[opposite.ante].chips.length) {
				condition = true
			}
			break;
		case "bonusplus" :
			if(!target.betarea[opposite.ante].chips.length) {
				condition = true
			}
			break;
		case "pocket" :
			if(!target.betarea[opposite.ante].chips.length) {
				condition = true
			}
			break;
	}
	console.log(target, area, "opposite check", condition)
	return condition;
}

export default {
	bc_opposite,
	dt_opposite,
	sb_opposite,
	poker_opposite
}