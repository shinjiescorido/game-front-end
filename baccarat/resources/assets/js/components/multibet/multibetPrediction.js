import fnFormat from '../../factories/formatter';
import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap } from '../../factories/factories';

let pred = {
	big : null,
	smallroad : null,
	cockroach : null
}

let _this = null;

const player_prediction = (data, self) => {
	
	_this = self
	let color = "#fff";
	let pred_marks = null;

	if(data.gameName == "Baccarat") {
		pred_marks = predictMarks("p",data);
	} else {
		pred_marks = predictMarks("d",data);
	}

	let container = new createjs.Container();
	let bg = new createjs.Shape();
	bg.graphics.beginFill("#fff").ss(1).s("#ababab").drawRect(0,0,22,113);
	
	let label_bg = new createjs.Shape();
	label_bg.graphics.beginFill("#1565c0").drawCircle(10,10,8);

	let label_text = new createjs.Text(data.gameName == "Baccarat" ? "P" :"D", "10px lato", "#fff");
	label_text.set({textAlign:"center",x: 10,y: 4});

	let line = new createjs.Shape();
	line.graphics.ss(1).s("#8a8a8a").moveTo(0,22).lineTo(22,22);
	container.addChild(bg, label_bg,label_text,  line);

	if(pred_marks.big == "B") {
		color = "#1565c0"
	} else if(pred_marks.big == "R") {
		color = "#d32f2f"
	} else {
		color = "#fff"
	}

	pred.big = new createjs.Shape();
	pred.big.graphics.ss(3).s(color).drawCircle(8,8,7);
	pred.big.x = 3
	pred.big.y =  30
	container.addChild(pred.big);

	if(pred_marks.small == "B") {
		color = "#1565c0"
	} else if(pred_marks.small == "R") {
		color = "#d32f2f"
	} else {
		color = "#fff"
	}
	
	pred.smallroad = new createjs.Shape();
	pred.smallroad.graphics.beginFill(color).drawCircle(8,8,8);
	pred.smallroad.x = 3
	pred.smallroad.y = pred.big.y +30
	container.addChild(pred.smallroad);

	if(pred_marks.roach == "B") {
		color = "#1565c0"
	} else if(pred_marks.roach == "R") {
		color = "#d32f2f"
	} else {
		color = "#fff"
	}

	pred.cockroach = new createjs.Shape();
	pred.cockroach.graphics.beginFill(color).drawRoundRect(10,0,5,20,2.5);
	pred.cockroach.x = 8
	pred.cockroach.rotation = 45
	pred.cockroach.y = pred.smallroad.y + 20
	container.addChild(pred.cockroach);

	return container;
} 

const banker_prediciton = (data, self) => {

	_this = self
	let color = "#fff";
	let pred_marks = null;
	if(data.gameName == "Baccarat") {
		pred_marks = predictMarks("b",data);
	} else {
		pred_marks = predictMarks("z",data);
	}

	let container = new createjs.Container();
	let bg = new createjs.Shape();
	bg.graphics.beginFill("#fff").ss(1).s("#ababab").drawRect(0,0,22,113);

	let label_bg = new createjs.Shape();
	label_bg.graphics.beginFill("#d32f2f").drawCircle(10,10,8);

	let label_text = new createjs.Text(data.gameName == "Baccarat" ? "B" :"T", "10px lato", "#fff");
	label_text.set({textAlign:"center",x: 10,y: 4});

	let line = new createjs.Shape();
	line.graphics.ss(1).s("#8a8a8a").moveTo(0,22).lineTo(22,22);
	container.addChild(bg, label_bg,label_text,  line);

	if(pred_marks.big == "B") {
		color = "#1565c0"
	} else if(pred_marks.big == "R") {
		color = "#d32f2f"
	} else {
		color = "#fff"
	}

	pred.big = new createjs.Shape();
	pred.big.graphics.ss(3).s(color).drawCircle(8,8,7);
	pred.big.x = 3
	pred.big.y =  30
	container.addChild(pred.big);

	if(pred_marks.small == "B") {
		color = "#1565c0"
	} else if(pred_marks.small == "R") {
		color = "#d32f2f"
	} else {
		color = "#fff"
	}

	pred.smallroad = new createjs.Shape();
	pred.smallroad.graphics.beginFill(color).drawCircle(8,8,8);
	pred.smallroad.x = 3
	pred.smallroad.y = pred.big.y +30
	container.addChild(pred.smallroad);

	if(pred_marks.roach == "B") {
		color = "#1565c0"
	} else if(pred_marks.roach == "R") {
		color = "#d32f2f"
	} else {
		color = "#fff"
	}

	pred.cockroach = new createjs.Shape();
	pred.cockroach.graphics.beginFill(color).drawRoundRect(10,0,5,20,2.5);
	pred.cockroach.x = 8
	pred.cockroach.rotation = 45
	pred.cockroach.y = pred.smallroad.y + 20
	container.addChild(pred.cockroach);

	return container;
}

let predictMarks = (type, data) =>{

	if(!data.marks || !data.marks.length)  {
		// return  {big: new createjs.Shape()}
		return {big:"W", roach:"W", small: "W"}
	}

	let clone_marks = _.clone(data.marks);
	clone_marks.push({mark: type})

	let bigeye = null;//fnFormat().fnFormatBigEyeBoy(clone_marks,6,52);
	let small = null;//fnFormat().fnFormatSmallRoad(clone_marks,6,28);
	let cockroach = null;//fnFormat().fnFormatCockroachPig(clone_marks,6,28);

	if(data.gameName == "Baccarat") {
		bigeye = fnFormat().fnFormatBigEyeBoy(clone_marks,6,52);
		small = fnFormat().fnFormatSmallRoad(clone_marks,6,28);
		cockroach = fnFormat().fnFormatCockroachPig(clone_marks,6,28);		
	} else {
		bigeye = fnFormat().fnFormatDTBigEyeBoy(clone_marks,6,52);
		small = fnFormat().fnFormatDTSmallRoad(clone_marks,6,28);
		cockroach = fnFormat().fnFormatDTCockroachPig(clone_marks,6,28);	
	}


	let lastbig = [];
	let lastsmall = [];
	let lastroach = [];

	for(var x = 0; x < bigeye.matrix.length; x++) {
		for(var a = 0; a < bigeye.matrix[x].length; a++) {
			if(bigeye.matrix[x][a] === undefined) continue;

			if((x) == bigeye.row) {
				if(bigeye.matrix[0][a+1] == undefined) {
					bigeye.last_mark = bigeye.matrix[x][a];
				}
			}

			lastbig.push(bigeye.matrix[x][a]);
		}
	}

	for(var x = 0; x < small.matrix.length; x++) {
		for(var a = 0; a < small.matrix[x].length; a++) {
			if(small.matrix[x][a] === undefined) continue;

			if((x) == small.row) {
				if(small.matrix[0][a+1] == undefined) {
					small.last_mark = small.matrix[x][a]
				}
			}

			// if(small.matrix[x][a]) {
				lastsmall.push(small.matrix[x][a])
			// }
		}
	}

	for(var x = 0; x < cockroach.matrix.length; x++) {
		for(var a = 0; a < cockroach.matrix[x].length; a++) {
			if(cockroach.matrix[x][a] === undefined) continue;

			if((x) == cockroach.row) {
				if(cockroach.matrix[cockroach.row][a+1] == undefined) {
					// sp.last_child = true;
					cockroach.last_mark = cockroach.matrix[x][a]
				}
			}
			// if(cockroach.matrix[x][a]) {
				lastroach.push(cockroach.matrix[x][a])
			// }
		}
	}

	// === fix for last mark null
	if(!small.last_mark) {
		var len = 0;
		for(var x = 0; x < small.matrix[small.matrix.length-1].length; x++) {
			if(small.matrix[small.matrix.length-1][x] !== undefined) len = x;
		}
		small.last_mark = small.matrix[small.matrix.length-1][len];
	}

	if(!bigeye.last_mark) {
		var len = 0;
		for(var x = 0; x < bigeye.matrix[bigeye.matrix.length-1].length; x++) {
			if(bigeye.matrix[bigeye.matrix.length-1][x] !== undefined) len = x;
		}
		bigeye.last_mark = bigeye.matrix[bigeye.matrix.length-1][len];
	}

	if(!cockroach.last_mark) {
		var len = 0;
		for(var x = 0; x < cockroach.matrix[cockroach.matrix.length-1].length; x++) {
			if(cockroach.matrix[cockroach.matrix.length-1][x] !== undefined) len = x;
		}
		cockroach.last_mark = cockroach.matrix[cockroach.matrix.length-1][len];
	}

	let toreturn = {big: lastbig.length ? bigeye.last_mark.mark : 'W', small: lastsmall.length ? small.last_mark.mark : 'W', roach : lastroach.length ? cockroach.last_mark.mark : 'W'}
	// let toreturn = {big: lastbig.length ? lastbig[lastbig.length-1].mark : 'W', small: lastsmall.length ? lastsmall[lastsmall.length-1].mark : 'W', roach : lastroach.length ? lastroach[lastroach.length-1].mark : 'W'}
	return  toreturn;
}

export default () => {
	return {player_prediction, banker_prediciton};
}