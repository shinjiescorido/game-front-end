export default(parent,cards_spriteSheet) => {
	let cards = {
		"dragon": {
			posX:0,
			posY: 0
		},
		"tiger":{
			posX:0,
			posY: 0	
		}
	}	

	parent.dragon_card = new createjs.Sprite(cards_spriteSheet,"back");
	parent.dragon_card.scaleX = parent.dragon_card.scaleY =  0.8;
	parent.dragon_card.regX = parent.dragon_card.getTransformedBounds().width/2;
	parent.dragon_card.x = 60;

	parent.tiger_card = new createjs.Sprite(cards_spriteSheet,"back");
	parent.tiger_card.scaleX = parent.tiger_card.scaleY = 0.8;
	parent.tiger_card.regX = parent.tiger_card.getTransformedBounds().width/2;
	parent.tiger_card.x = 270

	return [parent.dragon_card,parent.tiger_card];
}