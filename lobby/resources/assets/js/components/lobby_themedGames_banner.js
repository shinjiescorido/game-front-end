import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas } from '../factories/factories';
import rmformat from '../factories/formatter';

let instance = null;
let formatData = rmformat();

export default() => {
	instance = instance || new blu.Component({
		ads : [],
		circle_indicator: [],
		main() {
			
			this.y = 72;

			this.visible = false;
			
			this.banner_container = new createjs.Container();

			let banner_mask = new createjs.Shape();
			banner_mask.graphics.beginFill("red").drawRect(0,0,1690,230);

			let banner_data = [
				{
					banner_image : "spin-n-win_banner",
					gameName : "spinnwin",
					icon : "",
					src : "/img/spin-n-win_banner.png"
				},
				{
					banner_image : "banner_img1",
					gameName : "redwhite",
					icon : "",
					src : "/img/red-white_banner.png"
				},
				{
					banner_image : "dragon-tiger_banner",
					gameName : "dragon-tiger",
					icon : "",
					src : "/img/dragon-tiger_banner.png"
				},
				{
					banner_image : "reel-games_banner",
					gameName : "reel-games",
					icon : "",
					src : "/img/reel-games_banner.png"
				}
			]

			this.createAds(banner_data);

			this.addChild(this.banner_container);

			this.banner_container.mask = banner_mask;
			// === banner
			this.table_banner_container = new createjs.Container();
			this.table_banner_container.visible = false;
			this.table_banner_container.mask = banner_mask;
			this.addChild(this.table_banner_container);

			this.meta_poker_sample = [{"roundId":328,"roundNum":318,"gameInfo":{"burn":["0005","0026","0020"],"flop":["0035","0046","0027"],"turn":"0000","river":"0049","dealer":["0002","0048"],"player":["0039","0009"]},"gameResult":{"cards":["0039","0000","0009","0035","0049"],"winner":"player","handtype":"Two Pair"}},{"roundId":327,"roundNum":317,"gameInfo":{"burn":["0005","0026","0049"],"flop":["0035","0046","0027"],"turn":"0000","river":"0002","dealer":["0048","0028"],"player":["0039","0009"]},"gameResult":{"cards":["0039","0000","0009","0035","0046"],"winner":"player","handtype":"Two Pair"}},{"roundId":326,"roundNum":316,"gameInfo":{"burn":["0005","0026","0020"],"flop":["0035","0046","0027"],"turn":"0000","river":"0049","dealer":["0002","0048"],"player":["0039","0009"]},"gameResult":{"cards":["0039","0000","0009","0035","0049"],"winner":"player","handtype":"Two Pair"}}];
		},	
		createAds(data) {
			this.indi_ads = []
			for(var x = 0;x < data.length; x++) {
				this.indi_ads[x] = new createjs.Container();
				// this.indi_ads[x].mask = header_mask;

				this.ads[x] = new createjs.Bitmap(data[x].src);
				this.ads[x].x = 0;
				this.ads[x].y = 30;
				this.indi_ads[x].addChild(this.ads[x]);
				this.ads[x].scaleX = this.ads[x].scaleY = 1.4;

				if(data[x].gameName == "redwhite") {
					this.ads[x].new_game_text =  new createjs.Text(window.language.lobby.comingsooncaps,"bold 35px ArvoItalic","#e8d478");
					this.ads[x].new_game_text.x = 1200 + 10;
					this.ads[x].new_game_text.y = 80;

					this.ads[x].text1 =  new createjs.Text("RED","55px arvobolditalic","#d12f22");
					this.ads[x].text1.x = 1200;
					this.ads[x].text1.y = 120;

					this.ads[x].text2 =  new createjs.Text("WHITE","55px arvobolditalic","#fff");
					this.ads[x].text2.x = this.ads[x].text1.x + this.ads[x].text1.getMeasuredWidth();
					this.ads[x].text2.y = 120;

					this.indi_ads[x].addChild(this.ads[x].new_game_text, this.ads[x].text1,this.ads[x].text2);
				} else if(data[x].gameName == "dragon-tiger") {

					this.ads[x].new_game_text =  new createjs.Text(window.language.lobby.newgamecaps,"bold 35px ArvoItalic","#e8d478");
					this.ads[x].new_game_text.x = 1200 + 10;
					this.ads[x].new_game_text.y = 80;

					this.ads[x].text1 =  new createjs.Text("DRAGON","50px arvobolditalic","#1976d3");
					this.ads[x].text1.x = 1200;
					this.ads[x].text1.y = 120;

					this.ads[x].text2 =  new createjs.Text("TIGER","50px arvobolditalic","#d22f2e");
					this.ads[x].text2.x = this.ads[x].text1.x + this.ads[x].text1.getMeasuredWidth();
					this.ads[x].text2.y = 120;

					this.indi_ads[x].addChild(this.ads[x].new_game_text, this.ads[x].text1,this.ads[x].text2);	
				} else if(data[x].gameName == "reel-games") {

					this.ads[x].new_game_text =  new createjs.Text(window.language.lobby.newgamecaps,"bold 35px ArvoItalic","#e8d478");
					this.ads[x].new_game_text.x = 1220 + 10;
					this.ads[x].new_game_text.y = 80;

					this.ads[x].text1 =  new createjs.Text("REEL","50px arvobolditalic","#ffb74c");
					this.ads[x].text1.x = 1220;
					this.ads[x].text1.y = 120;

					this.ads[x].text2 =  new createjs.Text("GAMES","50px arvobolditalic","#f57b00");
					this.ads[x].text2.x = this.ads[x].text1.x + this.ads[x].text1.getMeasuredWidth() + 15;
					this.ads[x].text2.y = 120;

					this.indi_ads[x].addChild(this.ads[x].new_game_text, this.ads[x].text1,this.ads[x].text2);	
				} else if(data[x].gameName == "spinnwin") {

					this.ads[x].new_game_text =  new createjs.Text(window.language.lobby.comingsooncaps,"bold 35px ArvoItalic","#e8d478");
					this.ads[x].new_game_text.x = 1200 + 10;
					this.ads[x].new_game_text.y = 80;

					this.ads[x].text1 =  new createjs.Text("SPIN","50px arvobolditalic","#ff9000");
					this.ads[x].text1.x = 1200;
					this.ads[x].text1.y = 120;

					this.ads[x].text2 =  new createjs.Text("N'","40px arvobolditalic","#c42827");
					this.ads[x].text2.x = this.ads[x].text1.x + this.ads[x].text1.getMeasuredWidth() + 15;
					this.ads[x].text2.y = 130;

					this.ads[x].text3 =  new createjs.Text("WIN","50px arvobolditalic","#fed500");
					this.ads[x].text3.x = this.ads[x].text2.x + this.ads[x].text2.getMeasuredWidth() + 5;
					this.ads[x].text3.y = 120;

					this.indi_ads[x].addChild(this.ads[x].new_game_text, this.ads[x].text1,this.ads[x].text2,this.ads[x].text3);	
				}

				// === for play bittons
				if(data[x].gameName == "dragon-tiger" || data[x].gameName == "reel-games") {

					this.ads[x].enter_button = new createjs.Shape();
					this.ads[x].enter_button.graphics.beginLinearGradientFill(["#ffd476", "#c69522"],[0,1],0,0,0,20).drawRoundRect(0,0,180,30,15);
					this.ads[x].enter_button.x = 1300;
					this.ads[x].enter_button.y = 185;
					this.ads[x].enter_button.viewPage = data[x].gameName == "dragon-tiger" ? "sub_dragonTiger" : "reel_games";
					this.ads[x].enter_text = new createjs.Text("Play Now","16px latoblack", "#543d0b");
					this.ads[x].enter_text.shadow = new createjs.Shadow("#fbf956",0,1.5,0)
					this.ads[x].enter_text.textAlign = "center";
					this.ads[x].enter_text.textBaseline = "middle";
					this.ads[x].enter_text.hitArea = this.ads[x].enter_button;
					this.ads[x].enter_text.x = 1300 + (180/2);
					this.ads[x].enter_text.y = 185 + (30/2);

					this.ads[x].enter_button.on("mouseover",()=>{
						$(".container").css('cursor','pointer')
					});

					this.ads[x].enter_button.on("mouseout",()=>{
						$(".container").css('cursor','cursor')
					});

					this.ads[x].enter_button.on("click",(e)=>{
						//disable reel games for now
						if(e.target.viewPage == "reel_games") return;
							this.context.toggleView(e.target.viewPage);
					});
					
					this.indi_ads[x].addChild(this.ads[x].enter_button, this.ads[x].enter_text);		
				}
			

				this.banner_container.addChild(this.indi_ads[x]);

			}

			for(var x = 0;x < data.length; x++) {
				this.circle_indicator[x] = new createjs.Shape();
				this.circle_indicator[x].graphics.beginFill("#fff").drawCircle(0,0,6);
				this.circle_indicator[x].x = (x*28) + 680
				this.circle_indicator[x].y = 255
				this.circle_indicator[x].alpha = 0.5;
				this.banner_container.addChild(this.circle_indicator[x]);
			}
			this.playAds();
		},
		playAds () {
			if(!this.ads.length) return;

			this.circle_indicator[0].alpha = 1;

			for(var x = 0; x < this.ads.length; x++  ) {
				createjs.Tween.get(this.indi_ads[x],{loop:true})
				.wait(4000*x)
				.to({
					alpha: 0
				},(x*500))
				.wait(4000*x)
				.to({
					alpha : 1
				},(x*500))

			} //end for
		},
	});

	return instance;
}