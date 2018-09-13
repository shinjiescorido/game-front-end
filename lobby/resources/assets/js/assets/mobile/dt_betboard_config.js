let adjustY = -40;
let adjustX = 70;

let background = "rgba(33, 33, 33, 0.85)";

export default [
		{
			name:"dragon",
			width: "235",
			height:"230",
			posX:395+adjustX,
			posY:210+adjustY,
			bg: background,
			text_config : {
				text: "dragon",
				font:30
			},
			table_img : "",
			border_color : "#b71c1c",
			payout_multiplier: 1,
			bet_amt :0
		},
		{
			name:"dragon_big",	
			width: "170",
			height:(230/2)-6,
			posX:210+adjustX,
			posY:450+adjustY,
			bg: background,
			text_config : {
				text: "big",
				font:20
			},
			border_color : "#b71c1c",
			payout_multiplier: 1,
			bet_amt : 0
		},
		{
			name:"dragon_clubs",
			width: (232/2) - 5,
			height:"108",
			posX:395+adjustX,
			posY:570+adjustY,
			bg: background,
			betboard_img: "club_betboard",
			border_color : "#b71c1c",
			payout_multiplier: 3,
			bet_amt : 0
		},
		{
			name:"dragon_diamonds",
			width: (232/2) - 5,
			height:"108",
			posX:520+adjustX,
			posY:450+adjustY,
			bg: background,
			betboard_img: "diamond_betboard",
			border_color : "#b71c1c",
			payout_multiplier: 3,
			bet_amt : 0
		},
		{
			name:"dragon_even",
			width: "170",
			height:(230/2)-6,
			posX:210+adjustX,
			posY:210+adjustY,
			bg: background,
			text_config : {
				text : "even",
				font:20
			},
			border_color : "#b71c1c",
			payout_multiplier: 1,
			bet_amt : 0

		},
		{
			name:"dragon_hearts",
			width: (232/2) - 5,
			height:"108",
			posX:520+adjustX,
			posY:570+adjustY,
			bg: background,
			betboard_img: "heart_betboard",
			border_color : "#b71c1c",
			payout_multiplier: 3,
			bet_amt : 0
		},
		{
			name:"dragon_odd",
			width: "170",
			height:(230/2)-6,
			posX:210+adjustX,
			posY:332+adjustY,
			bg:background,
			text_config : {
				text : "odd",
				font:20
			},
			border_color : "#b71c1c",
			payout_multiplier: 1,
			bet_amt : 0
		},
		{
			name:"dragon_small",	
			width: "170",
			height:(230/2)-6,
			posX:210+adjustX,
			posY:570+adjustY,
			bg: background,
			text_config : {
				text : "small",
				font:20
			},
			border_color : "#b71c1c",
			payout_multiplier: 1,
			bet_amt : 0
		},
		{
			name:"dragon_spades",
			width: (232/2) - 5,
			height:"108",
			posX:395+adjustX,
			posY:450+adjustY,
			bg: background,
			betboard_img: "spade_betboard",
			border_color : "#b71c1c",
			payout_multiplier: 3,
			bet_amt : 0
		},
		{
			name:"tie",
			width: "160",
			height:"230",
			posX:645+adjustX,
			posY:210+adjustY,
			bg: background,
			text_config : {
				text : "tie",
				font:30
			},
			border_color : "#567f2e",
			payout_multiplier: 10,
			bet_amt : 0
		},
		{
			name:"tiger",
			width: "235",
			height:"230",
			posX:820+adjustX,
			posY:210+adjustY,
			bg: background,
			text_config : {
				text : "tiger",
				font:30
			},
			border_color : "#0d47a1",
			payout_multiplier: 1,
			bet_amt : 0
		},
		{
			name:"tiger_diamonds",
			width: (232/2) - 5,
			height:"108",
			posX:820+adjustX,
			posY:450+adjustY,
			bg: background,
			betboard_img: "diamond_betboard",
			border_color : "#0d47a1",
			payout_multiplier: 3,
			bet_amt : 0
		},
		{
			name:"tiger_big",
			width: "170",
			height:(230/2)-6,
			posX:1070+adjustX,
			posY:450+adjustY,
			bg: background,
			text_config : {
				text : "big",
				font:20
			},
			border_color : "#0d47a1",
			payout_multiplier: 1,
			bet_amt : 0
		},
		{
			name:"tiger_even",
			width: "170",
			height:(230/2)-6,
			posX:1070+adjustX,
			posY:210+adjustY,
			bg: background,
			text_config : {
				text : "even",
				font:20
			},
			border_color : "#0d47a1",
			payout_multiplier: 1,
			bet_amt : 0
		},
		{
			name:"tiger_odd",
			width: "170",
			height:(230/2)-6,
			posX:1070+adjustX,
			posY:332+adjustY,
			bg: background,
			text_config : {
				text : "odd",
				font:20
			},
			border_color : "#0d47a1",
			payout_multiplier: 1,
			bet_amt : 0
		},
		{
			name:"tiger_small",
			width: "170",
			height:(230/2)-6,
			posX:1070+adjustX,
			posY:570+adjustY,
			bg: background,
			text_config : {
				text : "small",
				font:20
			},
			border_color : "#0d47a1",
			payout_multiplier: 1,
			bet_amt : 0
		},
		{
			name:"tiger_hearts",
			width: (232/2) - 5,
			height:"108",
			posX:820+adjustX,
			posY:570+adjustY,
			bg: background,
			betboard_img: "heart_betboard",
			border_color : "#0d47a1",
			payout_multiplier: 3,
			bet_amt : 0
		},
		{
			name:"tiger_clubs",
			width: (232/2) - 5,
			height:"108",
			posX:945+adjustX,
			posY:570+adjustY,
			bg: background,
			betboard_img: "club_betboard",
			border_color : "#0d47a1",
			payout_multiplier: 3,
			bet_amt : 0
		},
		{
			name:"tiger_spades",
			width: (232/2) - 5,
			height:"108",
			posX:945+adjustX,
			posY:450+adjustY,
			bg: background,
			betboard_img: "spade_betboard",
			border_color : "#0d47a1",
			payout_multiplier: 3,
			bet_amt : 0
		}
]
