let adjustY = 10;
let adjustX = 10;

// let background = "rgba(33, 33, 33, 0.85)";
let background = '#711d1d';
let borderColor = '#fff'; //b71c1c

let rangeDetails = window.rangeDetails;

//Main area range
let mainMultiplier = (Math.floor(parseInt(window.mainMultiplier) / 10) * 10) * 0.01;
if (window.mainMultiplier % 10) mainMultiplier = 1;
let mainAreaMin = (rangeDetails.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
let mainAreaMax = ((rangeDetails.max * parseInt(window.currencyMultiplier)) * window.userMultiplier) * mainMultiplier;

//Side ranges
let sideBet = [];
for (var i = 0; i < rangeDetails.side_bet.length; i++) {
	sideBet = rangeDetails.side_bet[i];

	switch (sideBet.division) {
    	case ('Tie'):
    		let tieMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
    		let tieMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
			break;

		case ('Big&Small'):
    		let bigSmallMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
    		let bigSmallMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
			break;

		case ('Odd or Even'):
    		let oddEvenMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
    		let oddEvenMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
			break;

		case ('Suited Tie'):
    		let suitedTieMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
    		let suitedTieMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
			break;

		case ('Suit'):
    		let suitMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
    		let suitMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
			break;
		}
}

let config = [

		{
			name:"dragon_even",
			width: "170",
			height:(230/2)-6,
			posX:40+adjustX,
			posY:40+adjustY,
			bg: background,
			text_config : {
				text: window.language.locale == "zh" ? "偶数" : "even",
				font: window.language.locale == "zh" ? 60 : 30,
				beginFill: "#fff"
			},
			border_color : borderColor,
			payout_multiplier: 1,
			bet_amt : 0,
			scaleX: 1,
			scaleY: 1,
			min_bet : oddEvenMin,
			max_bet : oddEvenMax
		},
		{
			name:"dragon_odd",
			width: "170",
			height:(230/2)-6,
			posX:40+adjustX,
			posY:165+adjustY,
			bg:background,
			text_config : {
				text: window.language.locale == "zh" ? "奇数" : "odd",
				font: window.language.locale == "zh" ? 60 : 30,
				beginFill: "#fff"
			},
			border_color : borderColor,
			payout_multiplier: 1,
			bet_amt : 0,
			scaleX: 1,
			scaleY: 1,
			min_bet : oddEvenMin,
			max_bet : oddEvenMax
		},
		{
			name:"dragon_big",
			width: "170",
			height:(230/2)-6,
			posX:40+adjustX,
			posY:290+adjustY,
			bg: background,
			text_config : {
				text: window.language.locale == "zh" ? "大" : "big",
				font: window.language.locale == "zh" ? 60 : 30,
				beginFill: "#fff"
			},
			border_color : borderColor,
			payout_multiplier: 1,
			bet_amt : 0,
			scaleX: 1,
			scaleY: 1,
			min_bet : bigSmallMin,
			max_bet : bigSmallMax
		},
		{
			name:"dragon_small",
			width: "170",
			height:(230/2)-6,
			posX:40+adjustX,
			posY:415+adjustY,
			bg: background,
			text_config : {
				text : window.language.locale == "zh" ? "小" : "small",
				font: window.language.locale == "zh" ? 60 : 30,
				beginFill: "#fff"
			},
			border_color : borderColor,
			payout_multiplier: 1,
			bet_amt : 0,
			scaleX: 1,
			scaleY: 1,
			min_bet : bigSmallMin,
			max_bet : bigSmallMax
		},
		{
			name:"dragon_clubs",
			width: (232/2) - 5,
			height:"110",
			posX:225+adjustX,
			posY:415+adjustY,
			bg: background,
			betboard_img: "club_betboard",
			border_color : borderColor,
			payout_multiplier: 3,
			bet_amt : 0,
			scaleX: 1,
			scaleY: 1,
			min_bet : suitMin,
			max_bet : suitMax
		},
		{
			name: "dragon",
			width: "235",
			height:"235",
			posX:225+adjustX,
			posY:40+adjustY,
			bg: background,
			text_config : {
				text: window.language.locale == "zh" ? "龙\n1:1" : "dragon\n1:1",
				font: window.language.locale == "zh" ? 90 : 40,
				beginFill: "#277fff"
			},
			table_img : "",
			border_color : borderColor,
			payout_multiplier: 1,
			bet_amt :0,
			scaleX: 1,
			scaleY: 1,
			min_bet : mainAreaMin,
			max_bet : mainAreaMax
		},
		{
			name:"dragon_spades",
			width: (232/2) - 5,
			height:"110",
			posX:225+adjustX,
			posY:290+adjustY,
			bg: background,
			betboard_img: "spade_betboard",
			border_color : borderColor,
			payout_multiplier: 3,
			bet_amt : 0,
			scaleX: 1,
			scaleY: 1,
			min_bet : suitMin,
			max_bet : suitMax
		},
		{
			name:"dragon_diamonds",
			width: (232/2) - 5,
			height:"110",
			posX:350+adjustX,
			posY:290+adjustY,
			bg: background,
			betboard_img: "diamond_betboard",
			border_color : borderColor,
			payout_multiplier: 3,
			bet_amt : 0,
			scaleX: 1,
			scaleY: 1,
			min_bet : suitMin,
			max_bet : suitMax
		},
		{
			name: "tie",
			width: "180",
			height:"235",
			posX:475+adjustX,
			posY:40+adjustY,
			bg: background,
			text_config : {
				text : window.language.locale == "zh" ? "和局" : "tie",
				font: window.language.locale == "zh" ? 70 : 40,
				beginFill: "#66c927"
			},
			border_color : borderColor,
			payout_multiplier: 10,
			bet_amt : 0,
			scaleX: 1,
			scaleY: 1,
			min_bet : tieMin,
			max_bet : tieMax
		},
		{
			name:"dragon_hearts",
			width: (232/2) - 5,
			height:"110",
			posX:350+adjustX,
			posY:415+adjustY,
			bg: background,
			betboard_img: "heart_betboard",
			border_color : borderColor,
			payout_multiplier: 3,
			bet_amt : 0,
			scaleX: 1,
			scaleY: 1,
			min_bet : suitMin,
			max_bet : suitMax
		},
		{
			name:"tiger",
			width: "235",
			height:"235",
			posX:670+adjustX,
			posY:40+adjustY,
			bg: background,
			text_config : {
				text : window.language.locale == "zh" ? "虎\n1:1" : "tiger\n1:1",
				font: window.language.locale == "zh" ? 90 : 40,
				beginFill: "#e23333"
			},
			border_color : borderColor,
			payout_multiplier: 1,
			bet_amt : 0,
			scaleX: 1,
			scaleY: 1,
			min_bet : mainAreaMin,
			max_bet : mainAreaMax
		},
		{
			name:"tiger_diamonds",
			width: (232/2) - 5,
			height:"110",
			posX:670+adjustX,
			posY:290+adjustY,
			bg: background,
			betboard_img: "diamond_betboard",
			border_color : borderColor,
			payout_multiplier: 3,
			bet_amt : 0,
			scaleX: 1,
			scaleY: 1,
			min_bet : suitMin,
			max_bet : suitMax
		},
		{
			name:"tiger_spades",
			width: (232/2) - 5,
			height:"110",
			posX:795+adjustX,
			posY:290+adjustY,
			bg: background,
			betboard_img: "spade_betboard",
			border_color : borderColor,
			payout_multiplier: 3,
			bet_amt : 0,
			scaleX: 1,
			scaleY: 1,
			min_bet : suitMin,
			max_bet : suitMax
		},
		{
			name:"tiger_even",
			width: "170",
			height:(230/2)-6,
			posX:920+adjustX,
			posY:40+adjustY,
			bg: background,
			text_config : {
				text: window.language.locale == "zh" ? "偶数" : "even",
				font: window.language.locale == "zh" ? 60 : 30,
				beginFill: "#fff"
			},
			border_color : borderColor,
			payout_multiplier: 1,
			bet_amt : 0,
			scaleX: 1,
			scaleY: 1,
			min_bet : oddEvenMin,
			max_bet : oddEvenMax
		},
		{
			name:"tiger_odd",
			width: "170",
			height:(230/2)-6,
			posX:920+adjustX,
			posY:165+adjustY,
			bg: background,
			text_config : {
				text: window.language.locale == "zh" ? "奇数" : "odd",
				font: window.language.locale == "zh" ? 60 : 30,
				beginFill: "#fff"
			},
			border_color : borderColor,
			payout_multiplier: 1,
			bet_amt : 0,
			scaleX: 1,
			scaleY: 1,
			min_bet : oddEvenMin,
			max_bet : oddEvenMax
		},
		{
			name:"tiger_big",
			width: "170",
			height:(230/2)-6,
			posX:920+adjustX,
			posY:290+adjustY,
			bg: background,
			text_config : {
				text : window.language.locale == "zh" ? "大" : "big",
				font: window.language.locale == "zh" ? 60 : 30,
				beginFill: "#fff"
			},
			border_color : borderColor,
			payout_multiplier: 1,
			bet_amt : 0,
			scaleX: 1,
			scaleY: 1,
			min_bet : bigSmallMin,
			max_bet : bigSmallMax
		},
		{
			name:"tiger_small",
			width: "170",
			height:(230/2)-6,
			posX:920+adjustX,
			posY:415+adjustY,
			bg: background,
			text_config : {
				text : window.language.locale == "zh" ? "小" : "small",
				font: window.language.locale == "zh" ? 60 : 30,
				beginFill: "#fff"
			},
			border_color : borderColor,
			payout_multiplier: 1,
			bet_amt : 0,
			scaleX: 1,
			scaleY: 1,
			min_bet : bigSmallMin,
			max_bet : bigSmallMax
		},
		{
			name:"tiger_clubs",
			width: (232/2) - 5,
			height:"110",
			posX:795+adjustX,
			posY:415+adjustY,
			bg: background,
			betboard_img: "club_betboard",
			border_color : borderColor,
			payout_multiplier: 3,
			bet_amt : 0,
			scaleX: 1,
			scaleY: 1,
			min_bet : suitMin,
			max_bet : suitMax
		},
		{
			name:"suited_tie",
			width: "180",
			height:"234",
			posX:475+adjustX,
			posY:290+adjustY,
			bg: background,
			text_config : {
				text : "50:1",
				font: window.language.locale == "zh" ? 70 : 40,
				beginFill: "#daae2a"
			},
			betboard_img: window.language.locale == "zh" ? "suitedtie_betboard_zh" : "suitedtie_betboard",
			border_color : borderColor,
			payout_multiplier: 50,
			bet_amt : 0,
			scaleX: 1,
			scaleY: 1,
			min_bet : suitedTieMin,
			max_bet : suitedTieMax
		},
		{
			name:"tiger_hearts",
			width: (232/2) - 5,
			height:"110",
			posX:670+adjustX,
			posY:415+adjustY,
			bg: background,
			betboard_img: "heart_betboard",
			border_color : borderColor,
			payout_multiplier: 3,
			bet_amt : 0,
			scaleX: 1,
			scaleY: 1,
			min_bet : suitMin,
			max_bet : suitMax
		}
]
export default config;
