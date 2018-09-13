
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
			posX:"574",
			posY:"554",
			payout_multiplier: 1,
			chip_drop_scale : 0.6,
			chip_anim_toPlay : 2,
			scaleX : 0.85,
			scaleY : 0.85
		},
		{
			name:"dragon_big",
			width: "291",
			height:"97",
			posX:"412",
			posY:"546",
			payout_multiplier: 1,
			chip_drop_scale : 0.6,
			chip_anim_toPlay : 2,
			scaleX : 0.85,
			scaleY : 0.85
		},
		{
			name:"dragon_clubs",
			width: "198",
			height:"84",
			posX:"295",
			posY:"588",
			payout_multiplier: 3,
			chip_drop_scale : 0.6,
			chip_anim_toPlay : 2,
			scaleX : 0.85,
			scaleY : 0.85
		},
		{
			name:"dragon_diamonds",
			width: "225",
			height:"63",
			posX:"690",
			posY:"678",
			payout_multiplier: 3,
			chip_drop_scale : 0.6,
			chip_anim_toPlay : 2,
			scaleX : 0.85,
			scaleY : 0.85
		},
		{
			name:"dragon_even",
			width: "255",
			height:"78",
			posX:"505",
			posY:"510",
			payout_multiplier: 1,
			chip_drop_scale : 0.6,
			chip_anim_toPlay : 2,
			scaleX : 0.85,
			scaleY : 0.85

		},
		{
			name:"dragon_hearts",
			width: "209",
			height:"76",
			posX:"400",
			posY:"626",
			payout_multiplier: 3,
			chip_drop_scale : 0.6,
			chip_anim_toPlay : 2,
			scaleX : 0.85,
			scaleY : 0.85
		},
		{
			name:"dragon_odd",
			width: "269",
			height:"85",
			posX:"462",
			posY:"527",
			payout_multiplier: 1,
			chip_drop_scale : 0.6,
			chip_anim_toPlay : 2,
			scaleX : 0.85,
			scaleY : 0.85
		},
		{
			name:"dragon_small",
			width: "311",
			height:"107",
			posX:"356",
			posY:"567.5",
			payout_multiplier: 1,
			chip_drop_scale : 0.6,
			chip_anim_toPlay : 2,
			scaleX : 0.85,
			scaleY : 0.85
		},
		{
			name:"dragon_spades",
			width: "232",
			height:"72",
			posX:"531",
			posY:"656",
			payout_multiplier: 3,
			chip_drop_scale : 0.6,
			chip_anim_toPlay : 2,
			scaleX : 0.85,
			scaleY : 0.85
		},
		{
			name:"tie",
			width: "308",
			height:"146",
			posX:"878",
			posY:"570",
			payout_multiplier: 10,
			chip_drop_scale : 0.6,
			chip_anim_toPlay : 2,
			scaleX : 0.87,
			scaleY : 0.87
		},
		{
			name:"tiger",
			width: "429",
			height:"164",
			posX:"1082",
			posY:"552",
			payout_multiplier: 1,
			chip_drop_scale : 0.6,
			chip_anim_toPlay : 2,
			scaleX : 0.85,
			scaleY : 0.85
		},
		{
			name:"tiger_diamonds",
			width: "225",
			height:"63",
			posX:"1144",
			posY:"678",
			payout_multiplier: 3,
			chip_drop_scale : 0.6,
			chip_anim_toPlay : 2,
			scaleX : 0.85,
			scaleY : 0.85
		},
		{
			name:"tiger_big",
			width: "292",
			height:"97",
			posX:"1362",
			posY:"546",
			payout_multiplier: 1,
			chip_drop_scale : 0.6,
			chip_anim_toPlay : 2,
			scaleX : 0.85,
			scaleY : 0.85
		},
		{
			name:"tiger_even",
			width: "255",
			height:"78",
			posX:"1298",
			posY:"512",
			payout_multiplier: 1,
			chip_drop_scale : 0.6,
			chip_anim_toPlay : 2,
			scaleX : 0.85,
			scaleY : 0.85
		},
		{
			name:"tiger_odd",
			width: "269",
			height:"85",
			posX:"1326",
			posY:"527",
			payout_multiplier: 1,
			chip_drop_scale : 0.6,
			chip_anim_toPlay : 2,
			scaleX : 0.85,
			scaleY : 0.85
		},
		{
			name:"tiger_small",
			width: "311",
			height:"107",
			posX:"1400",
			posY:"568",
			payout_multiplier: 1,
			chip_drop_scale : 0.6,
			chip_anim_toPlay : 2,
			scaleX : 0.85,
			scaleY : 0.85
		},
		{
			name:"tiger_hearts",
			width: "209",
			height:"76",
			posX:"1446",
			posY:"626",
			payout_multiplier: 3,
			chip_drop_scale : 0.6,
			chip_anim_toPlay : 2,
			scaleX : 0.85,
			scaleY : 0.85
		},
		{
			name:"tiger_clubs",
			width: "198",
			height:"84",
			posX:"1560",
			posY:"587",
			payout_multiplier: 3,
			chip_drop_scale : 0.6,
			chip_anim_toPlay : 2,
			scaleX : 0.85,
			scaleY : 0.85
		},
		{
			name:"tiger_spades",
			width: "232",
			height:"72",
			posX:"1298",
			posY:"656",
			payout_multiplier: 3,
			chip_drop_scale : 0.6,
			chip_anim_toPlay : 2,
			scaleX : 0.85,
			scaleY : 0.85
		}
]