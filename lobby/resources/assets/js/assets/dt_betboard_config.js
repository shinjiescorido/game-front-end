
let  multipliers : {
  dragon : {
   regular : 1, // 1:1
   big     : 1,
   small   : 1,
   odd     : 1,
   even    : 1,
   heart   : 3,
   diamond : 3,
   club    : 3,
   spade   : 3
  },
  tiger : {
   regular : 1,
   big     : 1,
   small   : 1,
   odd     : 1,
   even    : 1,
   heart   : 3,
   diamond : 3,
   club    : 3,
   spade   : 3
  },
  tie : {
   regular : 10,
   suited  : 50
  }
 }


export default [
		{
			name:"dragon",
			width: "429",
			height:"164",
			posX:"500",
			posY:"540",
			payout_multiplier: 1,
			chip_drop_scale : 0.7,
			chip_anim_toPlay : 2
		},
		{
			name:"dragon_big",
			width: "291",
			height:"97",
			posX:"308",
			posY:"530",
			payout_multiplier: 1,
			chip_drop_scale : 0.7,
			chip_anim_toPlay : 2
		},
		{
			name:"dragon_clubs",
			width: "198",
			height:"84",
			posX:"176",
			posY:"580",
			payout_multiplier: 3,
			chip_drop_scale : 0.7,
			chip_anim_toPlay : 2
		},
		{
			name:"dragon_diamonds",
			width: "225",
			height:"63",
			posX:"637",
			posY:"686",
			payout_multiplier: 3,
			chip_drop_scale : 0.7,
			chip_anim_toPlay : 2
		},
		{
			name:"dragon_even",
			width: "255",
			height:"78",
			posX:"421",
			posY:"491",
			payout_multiplier: 1,
			chip_drop_scale : 0.7,
			chip_anim_toPlay : 2

		},
		{
			name:"dragon_hearts",
			width: "209",
			height:"76",
			posX:"298",
			posY:"625",
			payout_multiplier: 3,
			chip_drop_scale : 0.7,
			chip_anim_toPlay : 2
		},
		{
			name:"dragon_odd",
			width: "269",
			height:"85",
			posX:"367",
			posY:"510",
			payout_multiplier: 1,
			chip_drop_scale : 0.7,
			chip_anim_toPlay : 2
		},
		{
			name:"dragon_small",
			width: "311",
			height:"107",
			posX:"244",
			posY:"554",
			payout_multiplier: 1,
			chip_drop_scale : 0.7,
			chip_anim_toPlay : 2
		},
		{
			name:"dragon_spades",
			width: "232",
			height:"72",
			posX:"448",
			posY:"660",
			payout_multiplier: 3,
			chip_drop_scale : 0.7,
			chip_anim_toPlay : 2
		},
		{
			name:"tie",
			width: "308",
			height:"146",
			posX:"858",
			posY:"562",
			payout_multiplier: 10,
			chip_drop_scale : 0.7,
			chip_anim_toPlay : 2
		},
		{
			name:"tiger",
			width: "429",
			height:"164",
			posX:"1096.5",
			posY:"540",
			payout_multiplier: 1,
			chip_drop_scale : 0.7,
			chip_anim_toPlay : 2
		},
		{
			name:"tiger_diamonds",
			width: "225",
			height:"63",
			posX:"1164",
			posY:"688",
			payout_multiplier: 3,
			chip_drop_scale : 0.7,
			chip_anim_toPlay : 2
		},
		{
			name:"tiger_big",
			width: "292",
			height:"97",
			posX:"1428",
			posY:"530",
			payout_multiplier: 1,
			chip_drop_scale : 0.7,
			chip_anim_toPlay : 2
		},
		{
			name:"tiger_even",
			width: "255",
			height:"78",
			posX:"1353",
			posY:"490",
			payout_multiplier: 1,
			chip_drop_scale : 0.7,
			chip_anim_toPlay : 2
		},
		{
			name:"tiger_odd",
			width: "269",
			height:"85",
			posX:"1387",
			posY:"510",
			payout_multiplier: 1,
			chip_drop_scale : 0.7,
			chip_anim_toPlay : 2
		},
		{
			name:"tiger_small",
			width: "311",
			height:"107",
			posX:"1472",
			posY:"556",
			payout_multiplier: 1,
			chip_drop_scale : 0.7,
			chip_anim_toPlay : 2
		},
		{
			name:"tiger_hearts",
			width: "209",
			height:"76",
			posX:"1516",
			posY:"628",
			payout_multiplier: 3,
			chip_drop_scale : 0.7,
			chip_anim_toPlay : 2
		},
		{
			name:"tiger_clubs",
			width: "198",
			height:"84",
			posX:"1655",
			posY:"581",
			payout_multiplier: 3,
			chip_drop_scale : 0.7,
			chip_anim_toPlay : 2
		},
		{
			name:"tiger_spades",
			width: "232",
			height:"72",
			posX:"1346",
			posY:"662",
			payout_multiplier: 3,
			chip_drop_scale : 0.7,
			chip_anim_toPlay : 2
		}
]