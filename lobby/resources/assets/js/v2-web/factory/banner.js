import rmformat from '../../factories/formatter';
import timer from '../../timer-animation';
import tilesModule from '../../factories/tiles';
import { createSprite, randomNum, createCardSprite, createTileSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap } from '../../factories/factories';
import sboard from '../../factories/scoreboard_draw';

let formatData = rmformat();
let drawSboard  = sboard();

let instance = {
	list_tables :[],
	lastroundBg : [],
	rounds : [],
	getText(x,y,text,font,color,align,valign){
		let ctrl = new createjs.Text(text,font,color);
		ctrl.x = x;
		ctrl.y = y;
		ctrl.textAlign = align;
		ctrl.textBaseline = valign;//"middle"
		return ctrl;
	},
	bcBannerTable (data, _target) {
		//슈카운트 표시
		let deal_ct = new createjs.Container();
		let deal_label = this.getText(0,0,window.language.lobby.deal + ":","18px lato","#b5b5b5","left","top");
		this.deal_count = this.getText(177,4,data.marks.length,"18px bebasNeue","#b5b5b5","right","top");

		deal_ct.addChild(deal_label,this.deal_count);
		deal_ct.set({x:23,y:117+25});

		_target.addChild(deal_ct);
		//percentageset
		let bar_x = 20;
		let bar_y = 200;
		let bar_width = 184;
		let bar_height = 18;

		this.player_bar = new createjs.Shape()
		this.player_bar.graphics.beginFill("#0e47a1").drawRect(0,0,bar_width,bar_height);
		this.player_bar.y = bar_y;
		this.player_bar.x = bar_x;
		this.player_bar.scaleX = 0.1;
		this.player_bar.setBounds(0,0,bar_width,bar_height);
		_target.addChild(this.player_bar);

		this.tie_bar = new createjs.Shape()
		this.tie_bar.graphics.beginFill("green").drawRect(0,0,bar_width,bar_height);
		this.tie_bar.y = bar_y
		this.tie_bar.setBounds(0,0,bar_width,bar_height);
		this.tie_bar.regX = bar_width/2;
		this.tie_bar.scaleX = .4;
		this.tie_bar.x = bar_x  + this.player_bar.getTransformedBounds().width + (this.tie_bar.getTransformedBounds().width/2)
		_target.addChild(this.tie_bar);

		this.banker_bar = new createjs.Shape()
		this.banker_bar.graphics.beginFill("#b71b1c").drawRect(0,0,bar_width,18);
		this.banker_bar.y = bar_y
		this.banker_bar.regX = bar_width;
		this.banker_bar.x = bar_x  + bar_width
		this.banker_bar.scaleX = .5;
		this.banker_bar.setBounds(0,0,bar_width,bar_height);
		_target.addChild(this.banker_bar);


		this.player_val = this.getText( this.player_bar.x+2,this.player_bar.y,"0%","18px BebasNeue","#fff","left","top");// new createjs.Text("0%", "18px BebasNeue","#fff");
		_target.addChild(this.player_val);

		this.tie_val =  this.getText( this.tie_bar.x+2,this.tie_bar.y,"","18px BebasNeue","#fff","center","top");// new createjs.Text("0%", "18px BebasNeue","#fff");
		_target.addChild(this.tie_val);

		this.banker_val =  this.getText( this.banker_bar.x-2,this.banker_bar.y,"0%","18px BebasNeue","#fff","right","top");//new createjs.Text("0%", "18px BebasNeue","#fff");
		_target.addChild(this.banker_val);

		/***************************************************************************/
		let roadmap_ct = new createjs.Container();
		let baccarat_rm = new createjs.Shape();
		baccarat_rm.graphics.beginFill("#fff").drawRect(0,0,1034,158);
		baccarat_rm.cache(0,0,1034,158);
		roadmap_ct.addChild(baccarat_rm);
		roadmap_ct.set({x:224,y:61});
		_target.addChild(roadmap_ct);

		let lines = new createjs.Shape();
		lines.graphics.ss(.8).s("rgba(0,0,0,0.6)").moveTo(0,0);
		roadmap_ct.addChild(lines);

		let posY = 0;// roadmap_bg.y;
		let posX = 0;// roadmap_bg.x;
		lines.graphics.moveTo(posX,posY);
		for(var i = 0; i <= 6 ; i++) {
			lines.graphics.moveTo(posX,posY+ (26.3*i)).lineTo(posX + 315.6, posY+ (26.3*i));
		}

		for(var i = 0; i <= 12 ; i++) {
			lines.graphics.moveTo(posX+(26.3*i),posY).lineTo(posX+(26.3*i),posY+158);
		}


		for(var i = 0; i <= 9 ; i++) {
			lines.graphics.moveTo(posX+315.6,posY+ (17.53*i)).lineTo(1034, posY+ (17.53*i));
		}

		for(var i = 0; i <= 41 ; i++) {
			var x=posX+315.6+(17.53*i);
			lines.graphics.moveTo(x,posY).lineTo(x, posY+ 158);
		}


		lines.graphics.ss(1.5);
		lines.graphics.moveTo(posX+315.6,0).lineTo(posX+315.6, 158);
		lines.graphics.moveTo(posX+315.6,posY+ (17.53*6)).lineTo(1034, posY+ (17.53*6));

		lines.graphics.moveTo(posX+315.6+(17.53*14),105.3).lineTo(posX+315.6+(17.53*14), 158);
		lines.graphics.moveTo(posX+315.6+(17.53*28),105.3).lineTo(posX+315.6+(17.53*28), 158);

		// lines.shadow = new createjs.Shadow("#000",2,2,6);
		lines.alpha =.5;
		/***************************************************************************/

		// === count bg
		let bg = [];
		for(var i = 0; i < 6; i++) {
			bg[i] = new createjs.Shape();
			bg[i].graphics.beginFill("#0c3e66").drawRoundRect(0,0,56,32,8);
			bg[i].x = (i*64) + 1276 + 1;
			bg[i].y = 80;
			if(i > 2) {
				bg[i].graphics.clear().beginFill("#7e1d1e").drawRoundRect(0,0,56,32,8);
				bg[i].x = ((i-3)*64) + 1276 + 1;
				bg[i].y = 124;
			}
			_target.addChild(bg[i]);
		}

		let tie_bg = new createjs.Shape();
		tie_bg.graphics.beginFill("#557f2d").drawRoundRect(0,0,56,32,8);
		tie_bg.y = 168;
		tie_bg.x = 1276 + 62 + 1;
		_target.addChild(tie_bg);

		/**
		 * cosmetics start here
		 */

		this.player_indi = new createjs.Container();
		this.playerpair_indi = new createjs.Container();
		this.playernat_indi = new createjs.Container();

		this.banker_indi = new createjs.Container();
		this.bankerpair_indi = new createjs.Container();
		this.bankernat_indi = new createjs.Container();

		this.tie_indi = new createjs.Container();

		let offsetX = 14;
		let offsetY = 16;

		this.player_indi.x = bg[0].x + offsetX;
		this.player_indi.y = bg[0].y+ offsetY;
		this.playerpair_indi.x = bg[1].x + offsetX
		this.playerpair_indi.y = bg[1].y+ offsetY
		this.playernat_indi.x = bg[2].x + offsetX
		this.playernat_indi.y = bg[2].y + offsetY

		this.tie_indi.x = tie_bg.x + offsetX;
		this.tie_indi.y = tie_bg.y + offsetY;

		this.banker_indi.x = bg[3].x + offsetX;
		this.banker_indi.y = bg[3].y + offsetY;
		this.bankerpair_indi.x = bg[4].x + offsetX;
		this.bankerpair_indi.y = bg[4].y + offsetY;
		this.bankernat_indi.x = bg[5].x + offsetX;
		this.bankernat_indi.y = bg[5].y + offsetY;


		_target.addChild(this.player_indi, this.playerpair_indi, this.playernat_indi, this.banker_indi, this.bankerpair_indi, this.bankernat_indi, this.tie_indi);

		// === player count cosmetics
		let player_indi = new createjs.Shape();
		player_indi.graphics.ss(1).s("#fff").beginFill("#1465bf").drawCircle(0,0,9);
		this.player_indi.addChild(player_indi);

		let p_text = this.getText( player_indi.x,player_indi.y, window.language.locale == "zh" ? "闲" : "P","12px lato","#fff","center","middle"); //new createjs.Text("P","12px lato", "#fff");
		this.player_indi.addChild(p_text);

		//playerpair
		let playerpair_indi =  new createjs.Shape();
		playerpair_indi.graphics.ss(1).s("#fff").beginFill("#1465bf").drawCircle(0,0,9);
		this.playerpair_indi.addChild(playerpair_indi);

		let p_text2 = this.getText( playerpair_indi.x,playerpair_indi.y, window.language.locale == "zh" ? "闲" : "P","12px lato","#fff","center","middle"); //new createjs.Text("P","12px lato", "#fff");
		this.playerpair_indi.addChild(p_text2);

		let playerpair_indi2 =  new createjs.Shape();
		playerpair_indi2.graphics.ss(0.5).s("#fff").beginFill("#1465bf").drawCircle(0,0,3.5);
		playerpair_indi2.x = 6;
		playerpair_indi2.y = 5;
		this.playerpair_indi.addChild(playerpair_indi2);

		//playernatural
		let playernat_indi =  new createjs.Shape();
		playernat_indi.graphics.ss(1).s("#fff").beginFill("#1465bf").drawCircle(0,0,9);
		this.playernat_indi.addChild(playernat_indi);

		let n_text = this.getText( playernat_indi.x,playernat_indi.y, window.language.locale == "zh" ? "例" : "N","12px lato","#fff","center","middle");//  new createjs.Text("N","12px lato", "#fff");
		this.playernat_indi.addChild(n_text);

		//tie
		let tie_indi =  new createjs.Shape();
		tie_indi.graphics.ss(1).s("#fff").beginFill("#689f39").drawCircle(0,0,9);
		this.tie_indi.addChild(tie_indi);

		let t_text = this.getText( tie_indi.x,tie_indi.y, window.language.locale == "zh" ? "和" : "T","12px lato","#fff","center","middle"); //new createjs.Text("T","12px lato", "#fff");
		this.tie_indi.addChild(t_text);

		//bankernatural
		let bankernat_indi = new createjs.Shape();
		bankernat_indi.graphics.ss(1).s("#fff").beginFill("#d42e2e").drawCircle(0,0,9);
		this.bankernat_indi.addChild(bankernat_indi);

		let n_text2 = this.getText( bankernat_indi.x,bankernat_indi.y, window.language.locale == "zh" ? "例" : "N","12px lato","#fff","center","middle"); // new createjs.Text("N","12px lato", "#fff");
		this.bankernat_indi.addChild(n_text2);

		//bankerpair
		let bankerpair_indi = new createjs.Shape();
		bankerpair_indi.graphics.ss(1).s("#fff").beginFill("#d42e2e").drawCircle(0,0,9);
		this.bankerpair_indi.addChild(bankerpair_indi);

		let bankerpair_indi2 =  new createjs.Shape();
		bankerpair_indi2.graphics.ss(0.5).s("#fff").beginFill("#d42e2e").drawCircle(0,0,3.5);
		bankerpair_indi2.x = -6;
		bankerpair_indi2.y = -6;
		this.bankerpair_indi.addChild(bankerpair_indi2);

		let b_text2 = this.getText( bankerpair_indi.x,bankerpair_indi.y, window.language.locale == "zh" ? "庄" : "B","12px lato","#fff","center","middle"); // new createjs.Text("B","12px lato", "#fff");
		this.bankerpair_indi.addChild(b_text2);

		//banker
		let banker_indi = new createjs.Shape();
		banker_indi.graphics.ss(1).s("#fff").beginFill("#d42e2e").drawCircle(0,0,9);
		this.banker_indi.addChild(banker_indi);

		let b_text =  this.getText( banker_indi.x,banker_indi.y, window.language.locale == "zh" ? "庄" : "B","12px lato","#fff","center","middle"); // new createjs.Text("B","12px lato", "#fff");
		this.banker_indi.addChild(b_text);

		let xBox = 50;
		let yBox = 18;
		this.player_count =  this.getText( bg[0].x + xBox,bg[0].y + yBox,"0","22px BebasNeue","#fff","right","middle"); //new createjs.Text("0","22px BebasNeue","#fff")
		_target.addChild(this.player_count);

		this.playerpair_count =  this.getText( bg[1].x + xBox,bg[1].y + yBox,"0","22px BebasNeue","#fff","right","middle"); //new createjs.Text("0","22px BebasNeue","#fff")
		_target.addChild(this.playerpair_count);

		this.playernatural_count = this.getText( bg[2].x + xBox,bg[2].y + yBox,"0","22px BebasNeue","#fff","right","middle"); //new createjs.Text("0","22px BebasNeue","#fff")
		_target.addChild(this.playernatural_count);

		this.banker_count = this.getText( bg[3].x + xBox,bg[3].y + yBox,"0","22px BebasNeue","#fff","right","middle"); //new createjs.Text("0","22px BebasNeue","#fff");
		_target.addChild(this.banker_count);

		this.bankerpair_count  = this.getText( bg[4].x + xBox,bg[4].y + yBox,"0","22px BebasNeue","#fff","right","middle"); //= new createjs.Text("0","22px BebasNeue","#fff");
		_target.addChild(this.bankerpair_count);

		this.bankernatural_count = this.getText( bg[5].x + xBox,bg[5].y + yBox,"0","22px BebasNeue","#fff","right","middle"); //new createjs.Text("0","22px BebasNeue","#fff");
		_target.addChild(this.bankernatural_count);

		this.tie_count = this.getText(tie_bg.x + xBox,tie_bg.y + yBox,"0","22px BebasNeue","#fff","right","middle"); // new createjs.Text("0","22px BebasNeue","#fff");
		_target.addChild(this.tie_count);


		this.pearlRoad_container = new createjs.Container();
		this.pearlRoad_container.x = 221.5 + 2;
		this.pearlRoad_container.y = 59.5;
		this.pearlRoad_container.textAlign = "right"
    this.pearlRoad_container.textBaseline = "middle"
		_target.addChild(this.pearlRoad_container);

		let pearl_mask = new createjs.Shape();
		pearl_mask.graphics.drawRect(0,0,310,160);
		pearl_mask.x =  this.pearlRoad_container.x;
		pearl_mask.y =  this.pearlRoad_container.y;
		this.pearlRoad_container.mask = pearl_mask;
		_target.addChild(pearl_mask);

		this.bigRoad_container = new createjs.Container();
		_target.addChild(this.bigRoad_container);

		this.bigRoad_container.x = this.pearlRoad_container.x + 315.5;
		this.bigRoad_container.y = this.pearlRoad_container.y;

		let bigroad_mask = new createjs.Shape();
		bigroad_mask.graphics.beginFill("red").drawRect(0,0,740,108);
		bigroad_mask.x = this.bigRoad_container.x;
		bigroad_mask.y = this.bigRoad_container.y;
		this.bigRoad_container.mask = bigroad_mask;

		let bigeye_mask = new createjs.Shape();
		bigeye_mask.graphics.beginFill("red").drawRect(0,0,240,90);
		bigeye_mask.x = 534;
		bigeye_mask.y = 160;

		this.bigeyeboy_container = new createjs.Container();
		this.bigeyeboy_container.x = this.bigRoad_container.x + 1
		this.bigeyeboy_container.y = this.bigRoad_container.y + 106;
		this.bigeyeboy_container.mask = bigeye_mask;
		_target.addChild(this.bigeyeboy_container);

		this.small_container = new createjs.Container();
		this.small_container.x = this.bigRoad_container.x + 246
		this.small_container.y = this.bigRoad_container.y + 106;
		_target.addChild(this.small_container);

		this.cockroach_container = new createjs.Container();
		this.cockroach_container.x = this.bigRoad_container.x + 492
		this.cockroach_container.y = this.bigRoad_container.y + 106;
		_target.addChild(this.cockroach_container);
	},
	bcSetCount (data) {

		data =  _.filter(data, function (e) {
			return e;
		});

		let count = _.groupBy(data, function (e) {
			return e.mark;
		});
		let player_count = 0;
		let banker_count = 0;
		let tie_count = 0;

		let player_pair_cnt = 0;
		let banker_pair_cnt = 0;

		let banker_natural_cnt = 0;
		let player_natural_cnt = 0;

		let natural = {
			player: 0,
			banker: 0
		};

		data.forEach(function (e) {
			if(e.mark == "b" || e.mark == "q" || e.mark == "w"|| e.mark == "e") {
				banker_count ++
			} else if(e.mark  == "p" || e.mark  == "f" || e.mark  == "g" || e.mark  == "h" ) {
				player_count ++
			}
			 else if(e.mark  == "t" || e.mark  == "i" || e.mark  == "j" || e.mark  == "k" ) {
				tie_count ++
			}

			if(e.mark == "q" || e.mark == "w" || e.mark == "f" || e.mark == "g" || e.mark == "i" || e.mark == "j") {
				banker_pair_cnt ++;
			}

			if(e.mark == "w" || e.mark == "e" || e.mark == "g" || e.mark == "h"  || e.mark == "j" || e.mark == "k") {
				player_pair_cnt ++;
			}
			_.forEach(e.natural, (element) => {
			   	natural[element]++;
			})

			// if((e.mark == "b" || e.mark == "q" || e.mark == "w" || e.mark == "e") && (e.num == 9 || e.num == 8)) {
			// 	banker_natural_cnt ++;
			// }

			// if((e.mark == "p" || e.mark == "f" || e.mark == "g" || e.mark == "h") && (e.num == 9 || e.num == 8)) {
			// 	player_natural_cnt ++;
			// }
		});

		this.player_val.text = Math.round(player_count/(data.length ? data.length : 1)*100) + "%";
		this.tie_val.text = Math.round(tie_count/(data.length ? data.length : 1)*100) < 10 ? "" : Math.round(tie_count/(data.length ? data.length : 1)*100) + "%";
		this.banker_val.text = Math.round(banker_count/(data.length ? data.length : 1)*100) + "%";

		this.player_count.text = player_count;
		this.playerpair_count.text = player_pair_cnt;
		this.playernatural_count.text = natural.player; //player_natural_cnt;
		this.tie_count.text = tie_count;
		this.banker_count.text = banker_count;
		this.bankerpair_count.text = banker_pair_cnt;
		this.bankernatural_count.text = natural.banker;


		if(data.length>0){
			this.player_val.text = Math.round(player_count/(data.length ? data.length : 1)*100) + "%";
			this.tie_val.text = Math.round(tie_count/(data.length ? data.length : 1)*100) < 10 ? "" : Math.round(tie_count/(data.length ? data.length : 1)*100)+ "%";
			this.banker_val.text = Math.round(banker_count/(data.length ? data.length : 1)*100) + "%";


			createjs.Tween.get(this.player_bar)
			.to({
				scaleX : (player_count)/data.length
			},150).call(()=>{
				this.tie_bar.x = 20  + this.player_bar.getTransformedBounds().width + (this.tie_bar.getTransformedBounds().width/2)
				this.tie_val.x = this.tie_bar.x;
			})

			createjs.Tween.get(this.tie_bar)
			.to({
				scaleX : (tie_count)/data.length
			},150)

			createjs.Tween.get(this.banker_bar)
			.to({
				scaleX : (banker_count)/data.length
			},150)

		}
		else{
			this.player_val.text = "0%";
			this.tie_val.text = "";
			this.banker_val.text = "0%";

			player_count = 5;
			banker_count = 5;
			tie_count = 5;
			data.length = 15;

			createjs.Tween.get(this.player_bar)
			.to({
				scaleX : (player_count)/data.length
			},150).call(() =>{
				this.tie_bar.x = 20  + this.player_bar.getTransformedBounds().width + (this.tie_bar.getTransformedBounds().width/2)
				this.tie_val.x = this.tie_bar.x;
			});

			createjs.Tween.get(this.tie_bar)
			.to({
				scaleX : (tie_count)/data.length
			},150)

			createjs.Tween.get(this.banker_bar)
			.to({
				scaleX : (banker_count)/data.length
			},150)
		}
	},
	setBcRoadmap (data) {
		let miscData = (data.slave && data.slave == 'supersix')?data:{};

		// == pearl road
		let pearl = formatData.fnFormatBCPearlRoad(data.marks,6,12,miscData);

		this.pearlRoad_container.removeAllChildren();

		for(var i = 0; i < pearl.matrix.length; i++) {
			for(var e = 0; e < pearl.matrix[i].length; e++) {
				if(pearl.matrix[i][e] === undefined) continue;

				let sp = createSpriteRoadMap(window.language.locale == "zh" ? "/img/all_scoreboard_zh.png" : "/img/all_scoreboard.png" , 40,40, sp);
				sp.x = e * 26.35;
				sp.y = i * 26.2;
				sp.scaleY = sp.scaleX = 0.74
				sp.gotoAndStop("pearl-"+pearl.matrix[i][e].mark);
				this.pearlRoad_container.addChild(sp);

			}
		} //end for

		// == big road
		let big = formatData.fnFormatBCBigRoad(data.marks,6,42,miscData);

		this.bigRoad_container.removeAllChildren();

		for(var i = 0; i < big.matrix.length; i++) {
			for(var e = 0; e < big.matrix[i].length; e++) {
				if(big.matrix[i][e] === undefined) continue;

				let sp = createSpriteRoadMap("/img/all_scoreboard_20.png", 20, 19, sp);
				sp.x = (e * 17.5) + 0.7;
				sp.y = i * 17.5;
			//	sp.scaleY = sp.scaleX = 0.49
				this.	bigRoad_container.addChild(sp);

				if(big.matrix[i][e].ties) {
					if(big.matrix[i][e].ties > 1) {
						let tie_text = new createjs.Text(big.matrix[i][e].ties, "bold 18px BebasNeue","#000");
						tie_text.y = sp.y + (20/2) + 1;
						tie_text.x = sp.x  + (18.6)/2;
						tie_text.textAlign = "center";
						tie_text.textBaseline = "middle";
						this.	bigRoad_container.addChild(tie_text);
					}
					sp.gotoAndStop("big-"+big.matrix[i][e].mark+"-t");
				} else {
					sp.gotoAndStop("big-"+big.matrix[i][e].mark);
				}
			}
		} //end for

		//==big eyeboy
		let bigeye = formatData.fnFormatBigEyeBoy(data.marks,6,28);

		this.	bigeyeboy_container.removeAllChildren();

		for(var i = 0; i < bigeye.matrix.length; i++) {
			for(var e = 0; e < bigeye.matrix[i].length; e++) {
				if(bigeye.matrix[i][e] === undefined) continue;
				let sp = createSpriteRoadMap("/img/all_scoreboard_16.png" , 16,16, sp);
				sp.y = i * 8.7;
				sp.x = e * 8.82;
				sp.scaleX = sp.scaleY = .6;
				sp.gotoAndStop("bigeye-"+bigeye.matrix[i][e].mark);
				this.	bigeyeboy_container.addChild(sp);
			} //end
		}//end

		//==smallroad
		this.small_container.removeAllChildren();
		let small = formatData.fnFormatSmallRoad(data.marks,6,24);
		for(var i = 0; i < small.matrix.length; i++) {
			for(var e = 0; e < small.matrix[i].length; e++) {
				if(small.matrix[i][e] === undefined) continue;
				let sp = createSpriteRoadMap("/img/all_scoreboard_16.png" , 16,16, sp);
				sp.y = i * 8.7;
				sp.x = e * 8.82;
				sp.scaleX = sp.scaleY = .6;
				sp.gotoAndStop("bigsmall-"+small.matrix[i][e].mark);
				this.small_container.addChild(sp);
			}//end
		} //end


		// == cockroach
		this.cockroach_container.removeAllChildren();

		let roach = formatData.fnFormatCockroachPig(data.marks,6,24);

		for(var i = 0; i < roach.matrix.length; i++) {
			for(var e = 0; e < roach.matrix[i].length; e++) {
				if(roach.matrix[i][e] === undefined) continue;
				let sp = createSpriteRoadMap("/img/all_scoreboard_16.png" , 16,16, sp);
				sp.y = i * 8.7;
				sp.x = e * 8.82;
				sp.scaleX = sp.scaleY = .55
				sp.gotoAndStop("roach-"+roach.matrix[i][e].mark);
				this.cockroach_container.addChild(sp);
			}
		} //end
	}, // end setbcroadmap
	sicboBannerTable (data, _target) {
		// this.sicboStatus = this.getText(320,135, window.language.lobby.nowbetting, "22px lato","#fff","center","top");
		// _target.addChild(this.sicboStatus);
		_target.result_container.removeAllChildren();

		this.list_tables = _target.list_tables;

		this.list_tables.timer = _.clone(timer());
		this.list_tables.timer.scaleX = this.list_tables.timer.scaleY = 1.1;
		this.list_tables.timer.is_timerStart = false;
		this.list_tables.timer.visible = true;
		this.list_tables.timer.x = -21.5;
		this.list_tables.timer.y = 57.8;
		_target.result_container.addChild(this.list_tables.timer);

		this.list_tables.status = this.getText(0,0, window.language.lobby.nowbetting, "21px LatoBold","#fff","center","top");
		this.list_tables.status.text = window.language.lobby.nowbetting;

		this.dealer_img_bg  = new createjs.Shape();
		this.dealer_img_bg.graphics.beginFill("#f5ac4e").drawCircle(0,0,55);
		this.dealer_img_bg.x = 72;
		this.dealer_img_bg.y = 151;
		_target.result_container.addChild(this.dealer_img_bg);

		this.dealerImg = new createjs.Bitmap(data.dealerImage);
		this.dealerImg.x = 9;
		this.dealerImg.y = 92;
		this.dealerImg.scaleX = this.dealerImg.scaleY = 1;
		this.dealerImg.mask = this.dealer_img_bg;
		_target.result_container.addChild(this.dealerImg);

		//dealer info
		this.dealerName = this.getText(155,135, data.currentDealer, "20px lato","#fff","left","top");
		_target.result_container.addChild(this.dealerName);


		// === score board / road map
		let scoreboard_button_bg = new createjs.Shape();
		scoreboard_button_bg.graphics.ss(1).s("#9c9c9c").beginFill("#fff").drawRect(0, 0, 86, 156);
		scoreboard_button_bg.x = 420;
		scoreboard_button_bg.y = 65;
		_target.result_container.addChild(scoreboard_button_bg);

		let scoreboard_text = [window.language.sicbo.bigsmallcaps, window.language.sicbo.oddevencaps, window.language.sicbo.sumcaps, window.language.sicbo.dicecaps];
		let scoreboard_type = ["BIG/SMALL", "ODD/EVEN", "SUM", "DICE"];
		this.button = [];

		for (var i = 0; i < scoreboard_text.length; i++) {
			this.button[i] = new createjs.Shape();
			this.button[i].graphics.beginLinearGradientFill(["#d9bf6b", "#efde80", "#d9bf6b"], [0, 0.5, 1], 0, 0, 75, 0, 100).drawRoundRect(0, 0, 75, 31.5, 6);
			this.button[i].cursor = "pointer";
			this.button[i].y = (i * 37) + 7 + scoreboard_button_bg.y;
			this.button[i].x = scoreboard_button_bg.x + 5;
			this.button[i].type = scoreboard_type[i];
			this.button[i].state = "normal";
			_target.result_container.addChild(this.button[i]);

			this.button[i].text = new createjs.Text(scoreboard_text[i], window.language.locale == "zh" ? "bold 15px LatoRegular" : "bold 12px LatoRegular", "#000");
			this.button[i].text.x = this.button[i].x + (75 / 2);
			this.button[i].text.y = this.button[i].y + (31.5 / 2);
			this.button[i].text.textAlign = "center";
			this.button[i].text.textBaseline = "middle";
			this.button[i].text.hitArea = this.button[i];
			_target.result_container.addChild(this.button[i].text);

			this.button[i].changeState = function(e, type) {
				if (e.state == "active") return;
				if (type == "hover") {
					e.graphics.clear().beginLinearGradientFill(["#8e7c45", "#b59e58", "#8e7c45"], [0, 0.5, 1], 0, 0, 75, 0, 100).drawRoundRect(0, 0, 75, 31.5, 6);
					e.text.color = "#fff";
				} else {
					e.graphics.clear().beginLinearGradientFill(["#d9bf6b", "#efde80", "#d9bf6b"], [0, 0.5, 1], 0, 0, 75, 0, 100).drawRoundRect(0, 0, 75, 31.5, 6);
					e.text.color = "#000";
				}
			} // end hover

		 this.button[i].on("mouseover", (e) => {
			 e.target.changeState(e.target, "hover");
		 });

		 this.button[i].on("mouseout", (e) => {
			 e.target.changeState(e.target);
		 });

		 this.button[i].on("click", (e) => {
			 this.button.forEach((o) => {
				 o.state = "normal";
				 o.changeState(o);
			 });
			 e.target.changeState(e.target, "hover");
			 e.target.state = "active";
			 this.size_container.visible = false;
			 this.sum_container.visible = false;
			 this.dice_container.visible = false;
			 this.parity_container.visible = false;
			 switch (e.target.type.toLowerCase()) {
				 case "odd/even":
					 this.parity_container.visible = true;
					 break;
				 case "big/small":
					 this.size_container.visible = true;
					 break;
				 case "sum":
					 this.sum_container.visible = true;
					 break;
				 case "dice":
					 this.dice_container.visible = true;
					 break;
			 }
		 });
		}
		// default visible is size scoreboard
     this.button[0].graphics.clear().beginLinearGradientFill(["#8e7c45", "#b59e58", "#8e7c45"], [0, 0.5, 1], 0, 0, 75, 0, 100).drawRoundRect(0, 0, 75, 31.5, 6);
     this.button[0].state = "active";
     this.button[0].text.color = "#fff";

		// ROADMAP
		let roadmap_bg = new createjs.Shape();
		roadmap_bg.graphics.ss(1).s("#9c9c9c").beginFill("#fff").drawRect(0, 0, 546, 156);
		roadmap_bg.x = scoreboard_button_bg.x + 86;
		roadmap_bg.y = scoreboard_button_bg.y;
		_target.result_container.addChild(roadmap_bg);

		let lines = new createjs.Shape();
		lines.graphics.ss(.8).s("rgba(0,0,0,0.6)").moveTo(0, 0)
		_target.result_container.addChild(lines);
		let posY = roadmap_bg.y;
		let posX = roadmap_bg.x;

		for (var i = 0; i <= 6; i++) {
			lines.graphics.moveTo(posX, posY + (26 * i)).lineTo(posX + 546, posY + (26 * i))
		}

		for (var i = 0; i <= 21; i++) {
			lines.graphics.moveTo(posX + (26 * i), posY).lineTo(posX + (26 * i), posY + 156)
		}

		// lines.shadow = new createjs.Shadow("#000", 2, 2, 6);
		// lines.alpha = .5;

		let mask = new createjs.Shape();
		mask.graphics.beginFill("rgba(255,0,0,0.5)").drawRect(0,0,780,156);
		mask.x = roadmap_bg.x;
		mask.y = roadmap_bg.y;

		this.size_container = new createjs.Container();
		this.size_container.visible = true;
		this.size_container.x = roadmap_bg.x;
		this.size_container.mask = mask;
		_target.result_container.addChild(this.size_container);

		this.parity_container = new createjs.Container();
		this.parity_container.visible = false;
		this.parity_container.x = roadmap_bg.x;
		this.parity_container.mask = mask;
		_target.result_container.addChild(this.parity_container);

		this.sum_container = new createjs.Container();
		this.sum_container.visible = false;
		this.sum_container.x = roadmap_bg.x;
		this.sum_container.mask = mask;
		_target.result_container.addChild(this.sum_container);

		this.dice_container = new createjs.Container();
		this.dice_container.visible = false;
		this.dice_container.x = roadmap_bg.x;
		this.dice_container.mask = mask;
		_target.result_container.addChild(this.dice_container);


		let hot_res = new createjs.Shape();
		hot_res.graphics.beginFill("#d32f2e").drawRect(0, 0, 60, 156);
		hot_res.x = 15 + roadmap_bg.x + 546;
		hot_res.y = roadmap_bg.y;

		let hot_text = new createjs.Text(window.language.sicbo.hotcaps, "16px LatoRegular", "#fff");
		hot_text.textAlign = "center"
		hot_text.x = hot_res.x + 29.5;
		hot_text.y = hot_res.y + 4;
		_target.result_container.addChild(hot_res, hot_text);

		let cold_res = new createjs.Shape();
		cold_res.graphics.beginFill("#1665c1").drawRect(0, 0, 60, 156);
		cold_res.x = hot_res.x + 60 + 15;
		cold_res.y = hot_res.y;

		let cold_text = new createjs.Text(window.language.sicbo.coldcaps, "16px LatoRegular", "#fff");
		cold_text.textAlign = "center";
		cold_text.x = cold_res.x + 30.5;
		cold_text.y = cold_res.y + 5;
		_target.result_container.addChild(cold_res, cold_text);

		this.hot_cold_res_container = new createjs.Container();
    this.hot_cold_res_container.y = hot_text.y + 17;
    this.hot_cold_res_container.x = hot_res.x + (60/2);
    _target.result_container.addChild(this.hot_cold_res_container);

		let result_bg = new createjs.Shape();
		result_bg.graphics.beginFill("#3f3f3f").drawRect(0, 0, 150, 156);
		result_bg.x = cold_res.x + 60 + 15;
		result_bg.y = cold_res.y;
		_target.result_container.addChild(result_bg);

		let result_mask = new createjs.Shape();
		result_mask.graphics.drawRect(0, 0, 150, 150);
		result_mask.x = cold_res.x + 60 + 15;
		result_mask.y = cold_res.y;

		let result_label = new createjs.Text(window.language.lobby.latestresult.toUpperCase(), window.language.locale == "zh" ? "23px latoregular" : "16px latoregular", "#fff");
		result_label.x = result_bg.x + 75;

		if(window.language.locale == "zh") {
			result_label.y = 5 + result_bg.y;
		} else {
			result_label.y = 5 + result_bg.y;
		}
		result_label.textAlign = "center";
		_target.result_container.addChild(result_label);

		let latest_res_bg = new createjs.Shape();
    latest_res_bg.graphics.ss(1).s("#5e5e5e").beginFill("#1c1c1c").drawRect(0, 0, 150, 27);
    latest_res_bg.x = result_bg.x;
    latest_res_bg.y = result_label.y + 25;
    _target.result_container.addChild(latest_res_bg);
		// === set 5 dice result
		this.lastdice_res_container = new createjs.Container();
		this.lastdice_res_container.mask = result_mask;
		_target.result_container.addChild(this.lastdice_res_container);

		// === odd/even big/small percentage
		let odd_label = new createjs.Text(window.language.sicbo.oddcaps, "14px latoregular", "#fff");
		odd_label.x = 1425;
		odd_label.y = result_bg.y + 10;
		odd_label.textAlign = "right"
		_target.result_container.addChild(odd_label);

		let even_label = new createjs.Text(window.language.sicbo.evencaps, "14px latoregular", "#fff");
		even_label.x = 1617 + 10;
		even_label.y = odd_label.y;
		even_label.textAlign = "left";
		_target.result_container.addChild(even_label);

		let big_label = new createjs.Text(window.language.sicbo.bigcaps, "14px latoregular", "#fff");
		big_label.x = 1425;
		big_label.y = odd_label.y + 45;
		big_label.textAlign = "right"
		_target.result_container.addChild(big_label);

		let small_label = new createjs.Text(window.language.sicbo.smallcaps, "14px latoregular", "#fff");
		small_label.x = 1617 + 10;
		small_label.y = even_label.y + 45;
		small_label.textAlign = "left";
		_target.result_container.addChild(small_label);

		// if(window.language.locale == "kr" || window.language.locale == "zh") {
		// 	big_label.x = odd_label.x - 15;
		// 	even_label.x = odd_label.x + 227 - 10
		// 	small_label.x = even_label.x + 10;
		// }

		this.odd_bar = new createjs.Shape();
		this.odd_bar.graphics.beginFill("#b71b1c").drawRect(0, 0, 178, 14);
		this.odd_bar.setBounds(0, 0, 178, 14);
		this.odd_bar.x = 1425 + 10;
		this.odd_bar.y = odd_label.y + 1;
		this.odd_bar.scaleX = .5;
		_target.result_container.addChild(this.odd_bar);

		this.even_bar = new createjs.Shape();
		this.even_bar.graphics.beginFill("#0e47a1").drawRect(0, 0, 178, 14);
		this.even_bar.setBounds(0, 0, 178, 14);
		this.even_bar.x = this.odd_bar.x + 178;
		this.even_bar.y = this.odd_bar.y;
		this.even_bar.regX = 178;
		this.even_bar.scaleX = .5;
		_target.result_container.addChild(this.even_bar);

		this.big_bar = new createjs.Shape();
		this.big_bar.graphics.beginFill("#b71b1c").drawRect(0, 0, 178, 14);
		this.big_bar.setBounds(0, 0, 178, 18);
		this.big_bar.x = 1425 + 10;
		this.big_bar.y = big_label.y + 1;
		this.big_bar.scaleX = .5;
		_target.result_container.addChild(this.big_bar);

		this.small_bar = new createjs.Shape();
		this.small_bar.graphics.beginFill("#0e47a1").drawRect(0, 0, 178, 14);
		this.small_bar.setBounds(0, 0, 178, 14);
		this.small_bar.x = this.big_bar.x + 178;
		this.small_bar.y = this.big_bar.y;
		this.small_bar.regX = 178;
		this.small_bar.scaleX = .5;
		_target.result_container.addChild(this.small_bar);

		// === odd/even small/big values % init
		this.odd_val = new createjs.Text("0%", "18px BebasNeue", "#fff");
		this.odd_val.x = this.odd_bar.x + 4;
		this.odd_val.y = this.odd_bar.y + 14 + 2.5;
		_target.result_container.addChild(this.odd_val);

		this.even_val = new createjs.Text("0%", "18px BebasNeue", "#fff");
		this.even_val.x = this.even_bar.x - 4;
		this.even_val.y = this.even_bar.y + 14 + 2.5;
		this.even_val.textAlign = "right";
		_target.result_container.addChild(this.even_val);

		this.big_val = new createjs.Text("0%", "18px BebasNeue", "#fff");
		this.big_val.x = this.big_bar.x  + 4;
		this.big_val.y = this.big_bar.y + 14;
		_target.result_container.addChild(this.big_val);

		this.small_val = new createjs.Text("0%", "18px BebasNeue", "#fff");
		this.small_val.x = this.small_bar.x - 4;
		this.small_val.y = this.small_bar.y + 14;
		this.small_val.textAlign = "right";
		_target.result_container.addChild(this.small_val);

		let double_bg = new createjs.Shape();
		double_bg.graphics.beginFill("#e5b141").drawRoundRect(0, 0, 75, 55, 6);
		double_bg.x = this.odd_bar.x + 10;
		double_bg.y = 168;
		_target.result_container.addChild(double_bg);

		let double_label = new createjs.Text(window.language.sicbo.doublecaps, "bold 13px LatoRegular", "#000");
		double_label.x = double_bg.x + 37;
		double_label.y = double_bg.y + 3;
		double_label.textAlign = "center";
		_target.result_container.addChild(double_label);

		let double_label_bg = new createjs.Shape();
		double_label_bg.graphics.beginFill("#333333").drawRoundRect(0, 0, 63, 28, 6);
		double_label_bg.x = double_bg.x + 6;
		double_label_bg.y = double_label.y + 18;
		_target.result_container.addChild(double_label_bg);

		let triple_bg = new createjs.Shape();
		triple_bg.graphics.beginFill("#e5b141").drawRoundRect(0, 0, 75, 55, 6);
		triple_bg.x = double_bg.x + 75 + 10;
		triple_bg.y = double_bg.y;
		_target.result_container.addChild(triple_bg);

		let triple_label = new createjs.Text(window.language.sicbo.triplecaps, "bold 13px LatoRegular", "#000");
		triple_label.x = triple_bg.x + 37;
		triple_label.y = triple_bg.y + 3;
		triple_label.textAlign = "center";
		_target.result_container.addChild(triple_label);

		let triple_label_bg = new createjs.Shape();
		triple_label_bg.graphics.beginFill("#333333").drawRoundRect(0, 0, 63, 28, 6);
		triple_label_bg.x = triple_bg.x + 6;
		triple_label_bg.y = triple_bg.y + 21;
		_target.result_container.addChild(triple_label_bg);

		this.double_val = new createjs.Text("0", "bold 21px BebasNeue", "#fff");
		this.double_val.x = double_label_bg.x + (63/2);
		this.double_val.y = double_label_bg.y + 15;
		this.double_val.textAlign = "center";
		this.double_val.textBaseline = "middle";
		_target.result_container.addChild(this.double_val);

		this.triple_val = new createjs.Text("0", "bold 21px BebasNeue", "#fff");
		this.triple_val.x = triple_label_bg.x + (63/2);
		this.triple_val.y = triple_label_bg.y + 15;
		this.triple_val.textAlign = "center";
		this.triple_val.textBaseline = "middle";
		_target.result_container.addChild(this.triple_val);

		this.sicboSetHotColdResult(data);
		this.sicboSetPercentages(data);
		this.sicboDoubleTripleCount(data);
		this.sicboDrawRoadmap(data);
		this.sicboSetResult(data);
	},
	sicboSetHotColdResult (data) {
		if (this.hot_cold_res_container) {
			this.hot_cold_res_container.removeAllChildren();
		}

		let marks = data.marks;

		marks = _.filter(marks, (row)=>{
      return row.game_info
    });

    marks = _.filter(marks, (row)=>{
      if(row.game_info) return row.game_info
    });

    marks = _.filter(marks,  (row) => {
      if(typeof row.game_info === 'string') {
        row.game_info = JSON.parse(row.game_info)
      }
      return row.game_info && !row.isVoid
    });

		marks.forEach(function (row) {
      row.total = _.reduce( [row.game_info.one, row.game_info.two, row.game_info.three] , function (sum, n) {
        return parseInt(sum) + parseInt(n);
      });
    });

		let res =_.sortBy( _.groupBy(marks, function(row) {
      return row.total
    }), 'length');

    let cold_res = res.slice(0,5);

    let hot_res = res.slice(Math.max(res.length - 5, 1));

    hot_res = hot_res.reverse();

    hot_res = _.map(hot_res, function (e) {
      return isNaN(e[0].total) ? 1 : e[0].total;
    });

    cold_res = _.map(cold_res, function (e) {
      return isNaN(e[0].total) ? 1 : e[0].total;
    });


		hot_res.forEach( (e, i) => {
			let text = new createjs.Text(e, "20px BebasNeue", "#fff");
			text.y = (i * 26) + 3.5;
			text.textAlign = "center";
			this.hot_cold_res_container.addChild(text)
		});

		cold_res.forEach( (e, i) => {
			let text = new createjs.Text(e, "20px BebasNeue", "#fff");
			text.y = (i * 26) + 3.5;
			text.x = 75;
			text.textAlign = "center";
			this.hot_cold_res_container.addChild(text)
		});
		this.hot_cold_res_container.y / 156;
	}, //setSicboHotColdResult
	sicboDoubleTripleCount (data) {
    let marks = data.marks;

		marks = _.filter(marks, (row) => {
      if(typeof row.game_info === 'string') {
        row.game_info = JSON.parse(row.game_info);
      }
			return row.game_info && !row.isVoid
		});

		let data2 = _.map(marks, function(row) {
      return row.game_info;
    });

		data2.forEach((e) => {
			e.dice = [e.one, e.two, e.three]
		});

		let double_count = 0;
		let triple_count = 0;

		data2.forEach(function(e) {
			if (_.uniq(e.dice).length == 2) {
			  double_count++;
			} else if (_.uniq(e.dice).length == 1) {
			  triple_count++;
			}
		});

		this.double_val.text = double_count;
		this.triple_val.text = triple_count;
	},
	sicboSetPercentages (data) {
		let marks = data.marks;

    marks = _.filter(marks, (row) => {
      return row.game_info
    });

    marks = _.filter(marks,  (row) => {
      if(typeof row.game_info === 'string') {
          row.game_info = JSON.parse(row.game_info)
      }
      return row.game_info && !row.isVoid
    });

    let data2 = _.map(marks, function(e) {
      return [e.game_info.one, e.game_info.two, e.game_info.three];
    });

    let sum_data = [];

    data2.forEach(function(e) {
      sum_data.push(_.reduce(e, function(sum, n) {
        return parseInt(sum) + parseInt(n)
      }));
    });

    let odd_count = 0;
    let even_count = 0;
    let big_count = 0;
    let small_count = 0;

		sum_data.forEach(function(e) {
		  if (e % 2 == 0) {
		    even_count++;
		  } else {
		    odd_count++;
		  }

		  if (e >= 11) {
		    big_count++;
		  } else {
		    small_count++;
		  }
		});

		if (!this.odd_bar) return;

		this.odd_bar.scaleX = .5;

		createjs.Tween.get(this.odd_bar)
		.to({
		  scaleX: odd_count / marks.length
		}, 250);

		if (!this.even_bar) return;

		this.even_bar.scaleX = .5;

		createjs.Tween.get(this.even_bar)
		.to({
		  scaleX: even_count / marks.length
		}, 250);

    if (!this.big_bar) return;

    this.big_bar.scaleX = .5;

		createjs.Tween.get(this.big_bar)
		.to({
		  scaleX: big_count / marks.length
		}, 250);

    if (!this.small_bar) return;

    this.small_bar.scaleX = .5;
		createjs.Tween.get(this.small_bar)
		.to({
		  scaleX: small_count / marks.length
		}, 250);

    this.odd_val.text = Math.round((odd_count / marks.length) * 100) + "%";
    this.even_val.text = Math.round((even_count / marks.length) * 100) + "%";
    this.big_val.text = Math.round((big_count / marks.length) * 100) + "%";
    this.small_val.text = Math.round((small_count / marks.length) * 100) + "%";
	},
	sicboSetResult (data) {
		if (!data.marks.length) return;

    data.marks = _.filter(data.marks, (row) => {
      if ('game_info' in row) {
        return row;
      }
    });
		// _target.addChild(result_bg);

    this.dice = [];
    this.size = [];
    this.total = [];
    this.lastdice_res_container.removeAllChildren();


    let last150 = null;
    if (data.marks.length > 5) {
      last150 = data.marks.slice(Math.max(data.marks.length - 6, 1)).reverse();
    } else if (data.marks.length <= 5) {
      last150 = data.marks.reverse();
    }

    last150 = _.filter(last150,  (row) => {
      if(typeof row.game_info === 'string') {
        row.game_info = JSON.parse(row.game_info)
      }
      return row.game_info;
    });

    for (var i = 0; i < last150.length; i++) {
      let dice = last150[i].game_info.one + "" + last150[i].game_info.two + "" + last150[i].game_info.three;

      if (dice == "") dice = "123";

      this.dice.push({
        dice1: new createjs.Bitmap("/img/dice/dice" + dice[0] + ".png"),
        dice2: new createjs.Bitmap("/img/dice/dice" + dice[1] + ".png"),
        dice3: new createjs.Bitmap("/img/dice/dice" + dice[2] + ".png"),
        isVoid : last150[i].isVoid ? true : false
      });


      if(this.dice[i].isVoid) {
        let voidContainer = new createjs.Container();
        voidContainer.isVoid = true;

        var voidShape = new createjs.Shape();
        voidShape.graphics.beginFill("#212120").drawRect(0,0,160,34);
        voidShape.y =  (i * 37) + 45+2
        voidShape.x =  370;
        voidShape.isVoid = true;
        voidContainer.addChild(voidShape);

        var voidText = new createjs.Text("GAME VOID", " bold 12px lato", "#fff");
        voidText.set({x: 394, y: ((i*30) + 45) + (38/2), textBaseline: 'middle'})
        voidContainer.addChild(voidText);

        var voidImg = new createjs.Bitmap(self.context.load.getResources("void"));
        voidImg.set({x: voidText.x + voidText.getMeasuredWidth() + 12, y: ((i*30) + 45) + (38/2), regY : voidImg.getBounds().height/2});
        voidContainer.addChild(voidImg);

        this.lastdice_res_container.addChild(voidContainer);
      }

      this.lastdice_res_container.addChild(this.dice[i].dice1);
      this.lastdice_res_container.addChild(this.dice[i].dice2);
      this.lastdice_res_container.addChild(this.dice[i].dice3);


      this.dice[i].dice2.y = 95 + (i * 24) + 5;
			this.dice[i].dice1.y = 95 + (i * 24) + 5;
      this.dice[i].dice3.y = 95 + (i * 24) + 5;

      this.dice[i].dice1.x = 1220.86 + 20 - 2;
      this.dice[i].dice2.x = this.dice[i].dice1.x + 22;
      this.dice[i].dice3.x = this.dice[i].dice2.x + 20;

      this.dice[i].dice1.scaleX = this.dice[i].dice1.scaleY = 0.2;
      this.dice[i].dice2.scaleX = this.dice[i].dice2.scaleY = 0.2;
      this.dice[i].dice3.scaleX = this.dice[i].dice3.scaleY = 0.2;

      let total = _.reduce(dice.split(""), function(sum, n) {
        return parseInt(sum) + parseInt(n);
      });

      let uniqDice = _.uniq(dice.split(""));

      let text;

      if(window.language.locale == "zh") {
              text = uniqDice.length == 1 ? "和" : (total >= 11 ? "大" : "小");
              this.size[i] = new createjs.Text(text, "16px BebasNeue", text == "和" ? "#3aa955" : (text == "大" ? "#d22f2f" : "#1665c1"));
              this.total[i] = new createjs.Text(total, "16px BebasNeue", text == "和" ? "#3aa955" : (text == "大" ? "#d22f2f" : "#1665c1"));
      } else {
              text = uniqDice.length == 1 ? "T" : (total >= 11 ? "B" : "S");
              this.size[i] = new createjs.Text(text, "20px BebasNeue", text == "T" ? "#3aa955" : (text == "B" ? "#d22f2f" : "#1665c1"));
              this.total[i] = new createjs.Text(total, "20px BebasNeue", text == "T" ? "#3aa955" : (text == "B" ? "#d22f2f" : "#1665c1"));
      }

      this.size[i].x = this.dice[i].dice3.x + 30;
      this.size[i].y = this.dice[i].dice3.y + 8.5;
      this.size[i].textBaseline = "middle";
      this.lastdice_res_container.addChild(this.size[i]);

      if(window.language.locale == "zh") {
              this.total[i].x = this.size[i].x + 20;
      } else {
              this.total[i].x = this.size[i].x + 14;
      }

      this.total[i].y = this.size[i].y;
      this.total[i].textBaseline = "middle";
      this.lastdice_res_container.addChild(this.total[i]);


    }

    if (!this.lastdice_res_container.children.length) return;

    this.lastdice_res_container.children = this.lastdice_res_container.children.reverse()
    let shouldAnimate = true;
    for(var i = this.lastdice_res_container.children.length-1; i >= this.lastdice_res_container.children.length-5; i--) {

      if(this.lastdice_res_container.children[i].isVoid) {
        shouldAnimate = false;
      }

      if(shouldAnimate) {
        createjs.Tween.get(this.lastdice_res_container.children[i])
          .to({  alpha: 180 }, 180)
          .to({ alpha: 0 }, 180)
          .to({ alpha: 1 }, 180)
          .to({ alpha: 0 }, 180)
          .to({ alpha: 1 }, 180)
      }
    }

	}, //sicboSetResult
	sicboDrawRoadmap (data) {
		let container = null;

		let xPos = 0;
		let yPos = 0;
		let r = 0;
		let mask = null;

		let marks = formatData.fnFormatSicbo(data.marks, 20,6);

		for (var key in marks) {
			if (this[key + "_container"]) {
				if (!this[key + "_container"]) return;

				this[key + "_container"].removeAllChildren();
				this[key + "_container"].x = 519;
				this[key + "_container"].y = 78;

				container = this[key + "_container"];
				xPos = 26;
        yPos = 26;
        r = 11.5;

				let color = "";
				let text_val = "";
				let font_size = "bold 14px lato";

				let arr = marks[key];

				for (var e = 0; e < arr.length; e++) {
					if (arr[e] !== undefined) {
						for (var i = 0; i < arr[e].length; i++) {
							if (!arr[e][i]) continue;

							if (arr[e][i] !== undefined) {

								color = "#e5b241";
								text_val = arr[e][i];

								if (text_val.length > 2) {
									font_size = "bold 12px lato"
								}

								if (arr[e][i] == "odd") {
									color = "#d32f2f";
									text_val = window.language.locale == "zh" ? "单" : "O";
									font_size = window.language.locale == "zh" ? "14px lato" : "14px lato";
								}
								if (arr[e][i] == "even") {
									color = "#1565c0";
									text_val = window.language.locale == "zh" ? "双" : "E";
									font_size = "14px lato";
								}
								if (arr[e][i] == "big") {
									color = "#d32f2f";
									text_val = window.language.locale == "zh" ? "大" : "B";
									font_size = window.language.locale == "zh" ? "14px lato" : "14px lato";
								}
								if (arr[e][i] == "small") {
									color = "#1565c0";
									text_val = window.language.locale == "zh" ? "小" : "S";
									font_size = window.language.locale == "zh" ? "14px lato" : "14px lato";
								}
								if (arr[e][i] == "triple") {
									color = "#41a257";
									text_val = window.language.locale == "zh" ? "和" : "T";
									font_size = window.language.locale == "zh" ? "14px lato" : "14px lato";
								}

								arr[e][i] = new createjs.Shape();
								arr[e][i].graphics.beginFill(color).drawCircle(0, 0, r);
								arr[e][i].x = e * xPos;
								arr[e][i].y = i * yPos;

								arr[e][i].text = new createjs.Text(text_val, font_size, "#fff");
								if (key == "dice" || key == "sum") {
									arr[e][i].text = new createjs.Text(text_val, font_size, "#000");
								}
								arr[e][i].text.x = arr[e][i].x;
								arr[e][i].text.y = arr[e][i].y;

								arr[e][i].text.textAlign = "center";
								arr[e][i].text.textBaseline = "middle";
								container.addChild(arr[e][i], arr[e][i].text);
							}
						} //end for
					} //end if

				} //end for

				createjs.Tween.get(container.children[container.children.length - 1])
				.to({
					alpha: 1
				}, 180)
				.to({
					alpha: 0
				}, 180)
				.to({
					alpha: 1
				}, 180)
				.to({
					alpha: 0
				}, 180)
				.to({
					alpha: 1
				}, 180)

				createjs.Tween.get(container.children[container.children.length - 2])
				.to({
					alpha: 1
				}, 180)
				.to({
					alpha: 0
				}, 180)
				.to({
					alpha: 1
				}, 180)
				.to({
					alpha: 0
				}, 180)
				.to({
					alpha: 1
				}, 180)
			}

		}
	}, //drawSicboRoadmap

	paigowBannerTable (data, _target , self) {
		_target.result_container.removeAllChildren();
		this.list_tables = _target.list_tables;

		let img = self.context.load.getResources("small_tiles");

		// timer
		this.list_tables.timer = _.clone(timer());
		this.list_tables.timer.scaleX = this.list_tables.timer.scaleY = 1.1;
		this.list_tables.timer.is_timerStart = false;
		this.list_tables.timer.visible = true;
		this.list_tables.timer.x = -21.5;
		this.list_tables.timer.y = 57.8;
		_target.result_container.addChild(this.list_tables.timer);

		this.list_tables.status = this.getText(0,0, window.language.lobby.nowbetting, "21px LatoBold","#fff","center","top");
		this.list_tables.status.text = window.language.lobby.nowbetting;

		//dealer info
		this.dealer_img_bg  = new createjs.Shape();
		this.dealer_img_bg.graphics.beginFill("#f5ac4e").drawCircle(0,0,55);
		this.dealer_img_bg.x = 72;
		this.dealer_img_bg.y = 151;
		_target.result_container.addChild(this.dealer_img_bg);

		this.dealerImg = new createjs.Bitmap(data.dealerImage);
		this.dealerImg.x = 9;
		this.dealerImg.y = 92;
		this.dealerImg.scaleX = this.dealerImg.scaleY = 1;
		this.dealerImg.mask = this.dealer_img_bg;
		_target.result_container.addChild(this.dealerImg);

		this.dealerName = this.getText(155,135, data.currentDealer, "20px lato","#fff","left","top");
		_target.result_container.addChild(this.dealerName);

		let dealerBorder = new createjs.Shape();
	  dealerBorder.graphics.setStrokeStyle(1).beginStroke('#848484').lineTo(0, 174).lineTo(0,0);
	  dealerBorder.x = 421;
	  dealerBorder.y = 66;
	  _target.result_container.addChild(dealerBorder);

		// last round text
		let lastRoundsText = this.getText(448,60, window.language.lobby.last5roundscaps, "16px latobold","#fff","left","top");
		_target.result_container.addChild(lastRoundsText);

		// loop 5 backgrounds for lastrounds
		for (let i=0; i < 5; i++) {
			this.lastroundBg[i] = new createjs.Shape();
			this.lastroundBg[i].graphics.f('#2a2a2a').drawRoundRect( 0, 0, 148, 138, 8 );
			this.lastroundBg[i].x = 450 + (i * 155);
			this.lastroundBg[i].y = 90;
			_target.result_container.addChild(this.lastroundBg[i]);
		}

		// draw result history
		this.roundsContainer = new createjs.Container();
		this.roundsContainer.x = 0;
		this.roundsContainer.y = 18;
		_target.result_container.addChild(this.roundsContainer);

		// draw roadmap
		let roadmapText = this.getText(1243,60, window.language.lobby.roadmapcaps, "16px latobold","#fff","left","top");
		_target.result_container.addChild(roadmapText);

		let ch1 = this.getText(roadmapText.x,102, '庄', "20px latobold","#b5b5b5","left","top");
		_target.result_container.addChild(ch1);

		let ch2 = this.getText(roadmapText.x,102 + 32, '上', "20px latobold","#b5b5b5","left","top");
		_target.result_container.addChild(ch2);

		let ch3 = this.getText(roadmapText.x,102 + 32 * 2, '天', "20px latobold","#b5b5b5","left","top");
		_target.result_container.addChild(ch3);

		let ch4 = this.getText(roadmapText.x,102 + 32 * 3, '下', "20px latobold","#b5b5b5","left","top");
		_target.result_container.addChild(ch4);

		let roadmapcon = new createjs.Container();
		roadmapcon.x = 1270;
		roadmapcon.y = 98;
		_target.result_container.addChild(roadmapcon);

		let gw = 32;
		for(let i = 0; i < 4; i ++) {

			for(let j=0; j < 5; j++) {
				let grid = new createjs.Shape();
				grid.graphics.f('#3F3F3F').setStrokeStyle(1).beginStroke('#676767').moveTo(0,0).lineTo(0,gw).lineTo(gw,gw).lineTo(gw, 0).lineTo(0,0);
				grid.x = j * gw;
				grid.y = i * gw;
				roadmapcon.addChild(grid);
			}
		}

		// set roadmap data container
		this.roadmapDataCon = new createjs.Container();
		this.roadmapDataCon.x = 1272;
		this.roadmapDataCon.y = 99;
		_target.result_container.addChild(this.roadmapDataCon);

		// marks
		let roadMarks = data.marks;
		roadMarks = rmformat().fnPaigowLastRounds(roadMarks);

		_.forEach(roadMarks, (m) => {
			if(typeof m.game_info == 'string') m.game_info = JSON.parse(m.game_info); // format game_info
			if(typeof m.game_result == 'string') m.game_result = JSON.parse(m.game_result); //format game_result
		})

		// game routes
		this.gameRouteText = this.getText(1460,60, window.language.lobby.gameroutecaps, "16px latobold","#fff","left","top");
		_target.result_container.addChild(this.gameRouteText);

		// route tile container
		this.routeTileCon = new createjs.Container();
		this.routeTileCon.x = this.gameRouteText.x;
		this.routeTileCon.y = this.gameRouteText.y + 32;
		this.routeTileCon.routes = {};
		_target.result_container.addChild(this.routeTileCon);

		// static route tiles
		this.routeTiles = {
				'tile-1' : [],
				'tile-2' : [],
				'tile-3' : [],
				'tile-4' : [],
				'tile-5' : [],
				'tile-6' : [],
				'tile-7' : [],
				'tile-8' : [],
				'tile-9' : [],
				'tile-0' : [],
		};

		// loop route tiles
		let index = 0;
		for (let area in this.routeTiles) {
				let tile = createTileSprite(this, 46, 60, img);
				tile.gotoAndStop(area);
				tile.scaleX = tile.scaleY = 0.58;
				tile.x = (index > 4 ? index - 5 : index) * 36;
				tile.y = index < 5 ? 0 : 70;
				this.routeTileCon.addChild(tile);
				this.routeTileCon.routes[area] = [];

				// the tile indicator
				for (let j = 0; j < 4; j++ ) {
						this.routeTileCon.routes[area][j] = new createjs.Shape();
						this.routeTileCon.routes[area][j].graphics.f('#000').drawCircle(0,0,3.6);
						this.routeTileCon.routes[area][j].regX = this.routeTileCon.routes[area][j].regY = 3;
						this.routeTileCon.routes[area][j].x = tile.x + 13 + (j > 1 ? j - 2 : j) * 8;
						this.routeTileCon.routes[area][j].y = tile.y + 45 + (j < 2 ? 0 : 10);
						this.routeTileCon.addChild(this.routeTileCon.routes[area][j]);
				}
				index++;
		}


		this.setUsedTiles(data.marks);
		this.drawRoadMapPaigow(data.marks);
		this.displayRoomRoundsPaigow(data.marks, self);
	}, //drawPaigowBannerTable

	displayRoomRoundsPaigow(rounds, self) {
		rounds = rmformat().fnPaigowLastRounds(rounds);

		let img = self.context.load.getResources("small_tiles");

		let playArea = ['up', 'heaven', 'down', 'banker']; // the playArea to be looped
		let playerColor = ['#F18F00', '#134CA3', '#00965A', '#B61C1C']; // the highlight color of the winner

		//set rounds
		this.rounds = rounds || [];

		// clear tiles from roundsContainer
		this.roundsContainer.removeAllChildren();

		// loop rounds to display
		for (let i=0; i < rounds.length; i++) {
			// setcon contains 2 tiles per playarea
			let setcon = new createjs.Container();
			setcon.x = this.lastroundBg[i].x + (155 / 2);
			setcon.y = this.lastroundBg[i].y + (138 / 2)  - 37;
			this.roundsContainer.addChild(setcon);

			let d = 45; // adjustable dimension of the tiles
			// looping the playArea
			for (let j=0; j<playArea.length;j++) {
				let winner = _.find(rounds[i].game_result.winner, (o) => { return o == playArea[j] }); // variable to determine winner
				let tileData = _.find(rounds[i].game_info.tiles, (value, key)=> { return key == playArea[j] }); //tiles(2) to be displayed

				// tile 0 if no data
				if(!tileData) tileData = [0,0];

				// container of the tiles
				let tilecon = new createjs.Container();
				tilecon.setBounds( 0, 0, 75, 52 );
				tilecon.x = (j != 3 ? d - 8 : d) * (j == 3 ? 0 : j-1);
				tilecon.y = d * (j == 2 ? 0 : j == 3 ? -1 : j);
				tilecon.regX = 34;
				tilecon.regy = 21;
				setcon.addChild(tilecon);

				// highlight winner if winner is true
				if(winner) {
					let tileBg = new createjs.Shape();
					tileBg.graphics.f(playerColor[j]).drawRoundRect( -2,-2, 65, 45, 4 );
					tilecon.addChild(tileBg);
				}

				// first tile display
				if(tileData[0] != undefined) {
					let tile1 = createTileSprite(this, 46, 60, img);
					tile1.gotoAndStop('tile-'+tilesModule(tileData[0]).value);
					tile1.scaleX = tile1.scaleY = 0.65;
					tilecon.addChild(tile1);
				}
				//second tile display
				if(tileData[1] != undefined) {
					let tile2 = createTileSprite(this, 46, 60, img);
					tile2.gotoAndStop('tile-'+tilesModule(tileData[1]).value);
					tile2.scaleX = tile2.scaleY = 0.65;
					tile2.x = 30;
					tilecon.addChild(tile2);
				}
			}
		}
	}, // displayRounds
	resetInfosPaigow(self) {
		this.routeTiles = {
			'tile-1' : [],
			'tile-2' : [],
			'tile-3' : [],
			'tile-4' : [],
			'tile-5' : [],
			'tile-6' : [],
			'tile-7' : [],
			'tile-8' : [],
			'tile-9' : [],
			'tile-0' : [],
		};

    for (let area in this.routeTiles) {
      this.routeTileCon.routes[area][0].graphics.clear().f('#000').drawCircle(0,0,4);
      this.routeTileCon.routes[area][1].graphics.clear().f('#000').drawCircle(0,0,4);
      this.routeTileCon.routes[area][2].graphics.clear().f('#000').drawCircle(0,0,4);
      this.routeTileCon.routes[area][3].graphics.clear().f('#000').drawCircle(0,0,4);
    }

		this.roadmapDataCon.removeAllChildren();
		
		// clear tiles from roundsContainer
		this.roundsContainer.removeAllChildren();
	},
	drawRoadMapPaigow(data) {
    data = rmformat().fnPaigowLastRounds(data);
    data  = rmformat().fnPaigowRoadMap(data);
		// clear roadmap data container
		this.roadmapDataCon.removeAllChildren();

		//loop data to display
		for (let i=0; i<data.length; i++) {
			let areas = data[i].areas;
			for(let j=0; j<areas.length; j++) {
				//draw winning background if winner

				if(areas[j].isWinner) {
					let winBG = new createjs.Shape();
					winBG.graphics.f('#DEC343').drawRect(0,0,30,30);
					winBG.x = i * 32;
					winBG.y = j * 32;
					this.roadmapDataCon.addChild(winBG);
				}
				// draw player circle
				let circle = new createjs.Shape();
				circle.graphics.f(areas[j].color).drawCircle(0,0,13);
				circle.x = 15 + (i * 32);
				circle.y = 15 + (j * 32);
				this.roadmapDataCon.addChild(circle);
				//if pair add small circle
				if(areas[j].isPair) {
					circle.graphics.moveTo(0,15).setStrokeStyle(0.8).beginStroke('#fff').drawCircle(10,10,4);
				}
				// player circle total
				let total = this.getText(circle.x,circle.y, areas[j].total, "20px latobold","#fff","center","middle");
				this.roadmapDataCon.addChild(total);
			}
		}
	}, //drawRoadMapPaigow

	setUsedTiles(rounds) {
			rounds = rmformat().fnPaigowLastRounds(rounds)
			// static route tiles
			this.routeTiles = {
					'tile-1' : [],
					'tile-2' : [],
					'tile-3' : [],
					'tile-4' : [],
					'tile-5' : [],
					'tile-6' : [],
					'tile-7' : [],
					'tile-8' : [],
					'tile-9' : [],
					'tile-0' : [],
			};

			// loop rounds
			for(let i=0;i<rounds.length;i++) {
					 // loop tiles
					for(let area in rounds[i].game_info.tiles) {
							let tileData = rounds[i].game_info.tiles[area];
							if(tileData[0] != undefined && this.routeTiles['tile-'+tilesModule(tileData[0]).number]){
									this.routeTiles['tile-'+tilesModule(tileData[0]).number].push(tileData[0])
							}
							if(tileData[1] != undefined && this.routeTiles['tile-'+tilesModule(tileData[1]).number]){
									this.routeTiles['tile-'+tilesModule(tileData[1]).number].push(tileData[1])
							}
					}
			}

	    // reset
	    for (let area in this.routeTiles) {
	      this.routeTileCon.routes[area][0].graphics.clear().f('#000').drawCircle(0,0,4);
	      this.routeTileCon.routes[area][1].graphics.clear().f('#000').drawCircle(0,0,4);
	      this.routeTileCon.routes[area][2].graphics.clear().f('#000').drawCircle(0,0,4);
	      this.routeTileCon.routes[area][3].graphics.clear().f('#000').drawCircle(0,0,4);
	    }

			// loop routetiles
			for (let area in this.routeTiles) {
				// 2nd loop routetilecon
				for(let i=0;i<this.routeTileCon.routes[area].length;i++) {
					// draw route if data exist in routetiles
					if(this.routeTiles[area][i]) {
						this.routeTileCon.routes[area][i].graphics.clear().f('#2CA84B').drawCircle(0,0,4);
					}
				}
			}
	}, //setUsedTiles
	drawTilesInput (value, self) {

		if(value == 10) value = 0;

    this.routeTiles[`tile-${value}`].push(`000${value}`);

    // loop routetiles
    for (let area in this.routeTiles) {
      // 2nd loop routetilecon
      for(let i=0;i<this.routeTileCon.routes[area].length;i++) {
        // draw route if data exist in routetiles
        if(this.routeTiles[area][i]) {
          this.routeTileCon.routes[area][i].graphics.clear().f('#2CA84B').drawCircle(0,0,4);
        }
      }
    } // end for

	}
}

export default {
	instance
}
