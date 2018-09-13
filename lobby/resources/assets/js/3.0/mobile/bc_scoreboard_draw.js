let scoreboard = null;
let baccaratRoadmap = null;

	scoreboard = function (item) {
		let instance = {};
		let circle = null;
		let small_circle1 = null;
		let small_circle2 = null;
		let dash = null;

		dash = new createjs.Shape();
		dash.graphics.beginFill("#6aa03b").drawRect(0,0,3,32);
		dash.rotation = 46;
		dash.regX = 1.5;
		dash.regY = 16;

		switch(item) {
			case "bigroad" :
				instance.d = new createjs.Container();
				circle = new createjs.Shape();
				circle.graphics.ss(4).s("#1464c0").drawCircle(0,0,10);
				instance.d.addChild(circle);

				// tiger
				instance.t = new createjs.Container();
				circle = new createjs.Shape();
				circle.graphics.ss(4).s("transparent").drawCircle(0,0,10);
				instance.t.addChild(circle);

				// tiger
				instance.z = new createjs.Container();
				circle = new createjs.Shape();
				circle.graphics.ss(4).s("#d22e2e").drawCircle(0,0,10);
				instance.z.addChild(circle);

				instance.s = new createjs.Container();
				circle = new createjs.Shape();
				circle.graphics.ss(4).s("transparent").drawCircle(0,0,10);
				instance.s.addChild(circle);

				//dragon big
				instance.b = new createjs.Container();
				circle = new createjs.Shape();
				circle.graphics.ss(4).s("#1464c0").drawCircle(0,0,10);
				small_circle1 = new createjs.Shape();
				small_circle1.graphics.ss(.5).s("#fff").beginFill("#1464c0").drawCircle(-8,-8,4);
				instance.b.addChild(circle, small_circle1);

				//dragon small
				instance.c = new createjs.Container();
				small_circle1 = new createjs.Shape();
				small_circle1.graphics.ss(.5).s("#fff").beginFill("#1464c0").drawCircle(-8,8,4);
				instance.c.addChild(_.clone(circle), _.clone(small_circle1));

				//tiger big
				instance.e = new createjs.Container();
				circle = new createjs.Shape();
				circle.graphics.ss(4).s("#d22e2e").drawCircle(0,0,10);
				small_circle1 = new createjs.Shape();
				small_circle1.graphics.ss(.5).s("#fff").beginFill("#d22e2e").drawCircle(8,-8,4);
				instance.e.addChild(_.clone(circle), _.clone(small_circle1));

				//tiger small
				instance.f = new createjs.Container();
				circle = new createjs.Shape();
				circle.graphics.ss(4).s("#d22e2e").drawCircle(0,0,10);
				small_circle1 = new createjs.Shape();
				small_circle1.graphics.ss(.5).s("#fff").beginFill("#d22e2e").drawCircle(8,8,4);
				instance.f.addChild(_.clone(circle), _.clone(small_circle1));

				// dragon dragon big tiger big
				instance.g = new createjs.Container();
				circle = new createjs.Shape();
				circle.graphics.ss(4).s("#1464c0").drawCircle(0,0,10);
				small_circle1 = new createjs.Shape();
				small_circle1.graphics.ss(.5).s("#fff").beginFill("#d22e2e").drawCircle(8,-8,4);
				small_circle2 = new createjs.Shape();
				small_circle2.graphics.ss(.5).s("#fff").beginFill("#1464c0").drawCircle(-8,-8,4);
				instance.g.addChild(_.clone(circle), _.clone(small_circle1), _.clone(small_circle2));

				// dragon dragon big tiger small
				instance.h = new createjs.Container();
				circle = new createjs.Shape();
				circle.graphics.ss(4).s("#1464c0").drawCircle(0,0,10);
				small_circle1 = new createjs.Shape();
				small_circle1.graphics.ss(.5).s("#fff").beginFill("#d22e2e").drawCircle(8,8,4);
				small_circle2 = new createjs.Shape();
				small_circle2.graphics.ss(.5).s("#fff").beginFill("#1464c0").drawCircle(-8,-8,4);
				instance.h.addChild(_.clone(circle), _.clone(small_circle1), _.clone(small_circle2));

				// tiger dragon small tiger big
				instance.i = new createjs.Container();
				circle = new createjs.Shape();
				circle.graphics.ss(4).s("#1464c0").drawCircle(0,0,10);
				small_circle1 = new createjs.Shape();
				small_circle1.graphics.ss(.5).s("#fff").beginFill("#d22e2e").drawCircle(8,-8,4);
				small_circle2 = new createjs.Shape();
				small_circle2.graphics.ss(.5).s("#fff").beginFill("#1464c0").drawCircle(-8,8,4);
				instance.i.addChild(_.clone(circle), _.clone(small_circle1), _.clone(small_circle2));

				// dragon dragon small tiger small
				instance.j = new createjs.Container();
				circle = new createjs.Shape();
				circle.graphics.ss(4).s("#1464c0").drawCircle(0,0,10);
				small_circle1 = new createjs.Shape();
				small_circle1.graphics.ss(.5).s("#fff").beginFill("#d22e2e").drawCircle(8,8,4);
				small_circle2 = new createjs.Shape();
				small_circle2.graphics.ss(.5).s("#fff").beginFill("#1464c0").drawCircle(-8,8,4);
				instance.j.addChild(_.clone(circle), _.clone(small_circle1), _.clone(small_circle2));

				// tiger dragon big tiger big
				instance.k = new createjs.Container();
				circle = new createjs.Shape();
				circle.graphics.ss(4).s("#d22e2e").drawCircle(0,0,10);
				small_circle1 = new createjs.Shape();
				small_circle1.graphics.ss(.5).s("#fff").beginFill("#d22e2e").drawCircle(8,-8,4);
				small_circle2 = new createjs.Shape();
				small_circle2.graphics.ss(.5).s("#fff").beginFill("#1464c0").drawCircle(-8,-8,4);
				instance.k.addChild(_.clone(circle), _.clone(small_circle1), _.clone(small_circle2));

				// tiger dragon big tiger small
				instance.l = new createjs.Container();
				circle = new createjs.Shape();
				circle.graphics.ss(4).s("#d22e2e").drawCircle(0,0,10);
				small_circle1 = new createjs.Shape();
				small_circle1.graphics.ss(.5).s("#fff").beginFill("#d22e2e").drawCircle(8,8,4);
				small_circle2 = new createjs.Shape();
				small_circle2.graphics.ss(.5).s("#fff").beginFill("#1464c0").drawCircle(-8,-8,4);
				instance.l.addChild(_.clone(circle), _.clone(small_circle1), _.clone(small_circle2));

				// tiger dragon small tiger big
				instance.m = new createjs.Container();
				circle = new createjs.Shape();
				circle.graphics.ss(4).s("#d22e2e").drawCircle(0,0,10);
				small_circle1 = new createjs.Shape();
				small_circle1.graphics.ss(.5).s("#fff").beginFill("#d22e2e").drawCircle(8,-8,4);
				small_circle2 = new createjs.Shape();
				small_circle2.graphics.ss(.5).s("#fff").beginFill("#1464c0").drawCircle(-8,8,4);
				instance.m.addChild(_.clone(circle), _.clone(small_circle1), _.clone(small_circle2));

				// tiger dragon small tiger small
				instance.n = new createjs.Container();
				circle = new createjs.Shape();
				circle.graphics.ss(4).s("#d22e2e").drawCircle(0,0,10);
				small_circle1 = new createjs.Shape();
				small_circle1.graphics.ss(.5).s("#fff").beginFill("#d22e2e").drawCircle(8,8,4);
				small_circle2 = new createjs.Shape();
				small_circle2.graphics.ss(.5).s("#fff").beginFill("#1464c0").drawCircle(-8,8,4);
				instance.n.addChild(_.clone(circle), _.clone(small_circle1), _.clone(small_circle2));

				// tie tiger big dragon big
				instance.o = new createjs.Container();
				circle = new createjs.Shape();
				circle.graphics.ss(4).s("#d22e2e").drawCircle(0,0,10);
				small_circle1 = new createjs.Shape();
				small_circle1.graphics.ss(.5).s("#fff").beginFill("#d22e2e").drawCircle(8,-8,4);
				small_circle2 = new createjs.Shape();
				small_circle2.graphics.ss(.5).s("#fff").beginFill("#1464c0").drawCircle(-8,-8,4);
				instance.o.addChild(_.clone(circle), _.clone(small_circle1), _.clone(small_circle2));

				// tie tiger big dragon big
				instance.r = new createjs.Container();
				circle = new createjs.Shape();
				circle.graphics.ss(4).s("#d22e2e").drawCircle(0,0,10);
				small_circle1 = new createjs.Shape();
				small_circle1.graphics.ss(.5).s("#fff").beginFill("#d22e2e").drawCircle(8,8,4);
				small_circle2 = new createjs.Shape();
				small_circle2.graphics.ss(.5).s("#fff").beginFill("#1464c0").drawCircle(-8,8,4);
				instance.r.addChild(_.clone(circle), _.clone(small_circle1), _.clone(small_circle2));

				for(var key in instance) {
					dash.visible = false;
					instance[key].addChild(_.clone(dash))
				}
				break;

			case  "bigeyeboy":
				instance.B = new createjs.Container();
				circle = new createjs.Shape();
				circle.graphics.ss(4).s("#1464c0").drawCircle(0,0,10);
				instance.B.addChild(circle);

				instance.R = new createjs.Container();
				circle = new createjs.Shape();
				circle.graphics.ss(4).s("#d22e2e").drawCircle(0,0,10);
				instance.R.addChild(circle);
				break;

			case  "smallroad":
				instance.B = new createjs.Container();
				circle = new createjs.Shape();
				circle.graphics.beginFill("#1464c0").drawCircle(0,0,10);
				instance.B.addChild(circle);

				instance.R = new createjs.Container();
				circle = new createjs.Shape();
				circle.graphics.beginFill("#d22e2e").drawCircle(0,0,10);
				instance.R.addChild(circle);
				break;


			case  "cockroach":
				instance.B = new createjs.Container();
				dash = new createjs.Shape();
				dash.graphics.beginFill("#1464c0").drawRect(0,0,4,28);
				instance.B.addChild(dash);
				dash.rotation = 45;
				dash.regX = 2;
				dash.regY = 14;

				instance.R = new createjs.Container();
				dash = new createjs.Shape();
				dash.graphics.beginFill("#d22e2e").drawRect(0,0,4,28);
				instance.R.addChild(dash);
				dash.rotation = 45;
				dash.regX = 2;
				dash.regY = 14;
				break;
		}

		for(var key in instance) {
			instance[key].regX = -16;
			instance[key].regY = -16;
		}

		return instance;
	}

	baccaratRoadmap = function (radius, r2) {
	  this.radius = radius;
	  this.r2 = r2;
	  let banker_color = '#d22e2e';
	  let player_color = '#1464c0';
	  let tie_color = '#6aa03b';
	  let supersix_color = '#e5b241';

	  this.instance = {};
	  this.circle = null;
	  this.small_circle1 = null;
	  this.small_circle2 = null;
	  this.dash = null;
	  this.text = null;

	  this.dash = new createjs.Shape();
	  this.dash.graphics.beginFill(tie_color).drawRect(0,0,3,20);
	  this.dash.rotation = 46;
	  this.dash.regX = 1.5;
	  this.dash.regY = (20/2);

	  this.instance =  new createjs.Container();
	  this.circle = new createjs.Shape();
	  this.circle.graphics.beginFill(player_color).drawCircle(0,0,this.radius);

	  this.small_circle1 = new createjs.Shape();
	  this.small_circle1.graphics.ss(0.6).s("#fff").beginFill(player_color).drawCircle(0,0,this.r2);
	  this.small_circle1.set({regX:this.radius/2, regY:this.radius/2, x : this.radius + (this.r2/2), y: this.radius + (this.r2/2)})

	  this.small_circle2 = new createjs.Shape();
	  this.small_circle2.graphics.ss(0.6).s("#fff").beginFill(banker_color).drawCircle(0,0,this.r2);
	  this.small_circle2.set({regX:this.radius/2, regY:this.radius/2, x: (-1)*(this.r2/2), y: (-1)*(this.r2/2)})

	  this.text = new createjs.Text("P", "18px lato-black", '#fff');
	  this.text.set({textAlign:'center', textBaseline: 'middle'});

	  this.play = function (mark, font, ss) {
	    let r = this.radius;
	    this.instance.set({regX: r*(-1), regY: r*(-1)})

	    if(font) {
	      this.text.font = font;
	    }

	    switch(mark) {
	      case "pearl-b":
	      this.circle.graphics.clear().beginFill(banker_color).drawCircle(0,0,r);
	      this.text.text = window.language.locale === 'zh' ? '庄' : 'B';
	      this.instance.addChild(this.circle, this.text);
	      break;
	      case "pearl-p":
	      this.circle.graphics.clear().beginFill(player_color).drawCircle(0,0,r);
	      this.text.text = window.language.locale === 'zh' ? '闲' : 'P';
	      this.instance.addChild(this.circle, this.text);
	      break;
	      case "pearl-t":
	      this.circle.graphics.clear().beginFill(tie_color).drawCircle(0,0,r);
	      this.text.text = window.language.locale === 'zh' ? '和' : 'T';
	      this.instance.addChild(this.circle, this.text);
	      break;
	      case "pearl-q":
	      this.circle.graphics.clear().beginFill(banker_color).drawCircle(0,0,r);
	      this.text.text = window.language.locale === 'zh' ? '庄' : 'B';
	      this.instance.addChild(this.circle, this.text, this.small_circle2);
	      break;
	      case "pearl-w":
	      this.circle.graphics.clear().beginFill(banker_color).drawCircle(0,0,r);
	      this.text.text = window.language.locale === 'zh' ? '庄' : 'B';
	      this.instance.addChild(this.circle, this.text, this.small_circle2, this.small_circle1);
	      break;
	      case "pearl-e":
	      this.circle.graphics.clear().beginFill(banker_color).drawCircle(0,0,r);
	      this.text.text = window.language.locale === 'zh' ? '庄' : 'B';
	      this.instance.addChild(this.circle, this.text, this.small_circle1);
	      break;
	      case "pearl-f":
	      this.circle.graphics.clear().beginFill(player_color).drawCircle(0,0,r);
	      this.text.text = window.language.locale === 'zh' ? '闲' : 'P';
	      this.instance.addChild(this.circle, this.text, this.small_circle2);
	      break;
	      case "pearl-g":
	      this.circle.graphics.clear().beginFill(player_color).drawCircle(0,0,r);
	      this.text.text = window.language.locale === 'zh' ? '闲' : 'P';
	      this.instance.addChild(this.circle, this.text, this.small_circle2, this.small_circle1);
	      break;
	      case "pearl-h":
	      this.circle.graphics.clear().beginFill(player_color).drawCircle(0,0,r);
	      this.text.text = window.language.locale === 'zh' ? '闲' : 'P';
	      this.instance.addChild(this.circle, this.text, this.small_circle1);
	      break;
	      case "pearl-i":
	      this.circle.graphics.clear().beginFill(tie_color).drawCircle(0,0,r);
	      this.text.text = window.language.locale === 'zh' ? '和' : 'T';
	      this.instance.addChild(this.circle, this.text, this.small_circle2);
	      break;
	      case "pearl-j":
	      this.circle.graphics.clear().beginFill(tie_color).drawCircle(0,0,r);
	      this.text.text = window.language.locale === 'zh' ? '和' : 'T';
	      this.instance.addChild(this.circle, this.text, this.small_circle1, this.small_circle2);
	      break;
	      case "pearl-k":
	      this.circle.graphics.clear().beginFill(tie_color).drawCircle(0,0,r);
	      this.text.text = window.language.locale === 'zh' ? '和' : 'T';
	      this.instance.addChild(this.circle, this.text, this.small_circle1);
	      break;
	      case "pearl-l":
	      this.circle.graphics.clear().beginFill(supersix_color).drawCircle(0,0,r);
	      this.text.text = '6';
	      this.text.color = "#000";
	      this.instance.addChild(this.circle, this.text);
	      break;
	      case "pearl-m":
	      this.circle.graphics.clear().beginFill(supersix_color).drawCircle(0,0,r);
	      this.text.text = '6';
	      this.text.color = "#000";
	      this.instance.addChild(this.circle, this.text, this.small_circle2);
	      break;
	      case "pearl-n":
	      this.circle.graphics.clear().beginFill(supersix_color).drawCircle(0,0,r);
	      this.text.text = '6';
	      this.text.color = "#000";
	      this.instance.addChild(this.circle, this.text, this.small_circle1, this.small_circle2);
	      break;
	      case "pearl-o":
	      this.circle.graphics.clear().beginFill(supersix_color).drawCircle(0,0,r);
	      this.text.text = '6';
	      this.text.color = "#000";
	      this.instance.addChild(this.circle, this.text, this.small_circle1);
	      break;
	      //big road
	      case "big-b":
	      this.circle.graphics.clear().ss(ss ? ss : 3).s(banker_color).drawCircle(0,0,r);
	      this.instance.addChild(this.circle);
	      break;
	      case "big-p":
	      this.circle.graphics.clear().ss(ss ? ss : 3).s(player_color).drawCircle(0,0,r);
	      this.instance.addChild(this.circle);
	      break;
	      case "big-q":
	      this.circle.graphics.clear().ss(ss ? ss : 3).s(banker_color).drawCircle(0,0,r);
	      this.instance.addChild(this.circle, this.small_circle2);
	      break;
	      case "big-w":
	      this.circle.graphics.clear().ss(ss ? ss : 3).s(banker_color).drawCircle(0,0,r);
	      this.instance.addChild(this.circle, this.small_circle1, this.small_circle2);
	      break;
	      case "big-e":
	      this.circle.graphics.clear().ss(ss ? ss : 3).s(banker_color).drawCircle(0,0,r);
	      this.instance.addChild(this.circle, this.small_circle1);
	      break;
	      case "big-f":
	      this.circle.graphics.clear().ss(ss ? ss : 3).s(player_color).drawCircle(0,0,r);
	      this.instance.addChild(this.circle, this.small_circle2);
	      break;
	      case "big-g":
	      this.circle.graphics.clear().ss(ss ? ss : 3).s(player_color).drawCircle(0,0,r);
	      this.instance.addChild(this.circle, this.small_circle1, this.small_circle2);
	      break;
	      case "big-h":
	      this.circle.graphics.clear().ss(ss ? ss : 3).s(player_color).drawCircle(0,0,r);
	      this.instance.addChild(this.circle, this.small_circle1);
	      break;
	      case "big-l":
	      this.circle.graphics.clear().ss(ss ? ss : 3).s(supersix_color).drawCircle(0,0,r);
	      this.instance.addChild(this.circle);
	      break;
	      case "big-m":
	      this.circle.graphics.clear().ss(ss ? ss : 3).s(supersix_color).drawCircle(0,0,r);
	      this.instance.addChild(this.circle, this.small_circle2);
	      break;
	      case "big-n":
	      this.circle.graphics.clear().ss(ss ? ss : 3).s(supersix_color).drawCircle(0,0,r);
	      this.instance.addChild(this.circle, this.small_circle1, this.small_circle2);
	      break;
	      case "big-o":
	      this.circle.graphics.clear().ss(ss ? ss : 3).s(supersix_color).drawCircle(0,0,r);
	      this.instance.addChild(this.circle, this.small_circle1);
	      break;
	      case "bigeye-r":
	      this.circle.graphics.clear().ss(ss ? ss : 1.5).s(banker_color).drawCircle(0,0,r);
	      this.instance.addChild(this.circle);
	      break;
	      case "bigeye-b":
	      this.circle.graphics.clear().ss(ss ? ss : 1.5).s(player_color).drawCircle(0,0,r);
	      this.instance.addChild(this.circle);
	      break;
	      case "small-r":
	      this.circle.graphics.clear().beginFill(banker_color).drawCircle(0,0,r);
	      this.instance.addChild(this.circle);
	      break;
	      case "small-b":
	      this.circle.graphics.clear().beginFill(player_color).drawCircle(0,0,r);
	      this.instance.addChild(this.circle);
	      break;
	      case "roach-r":
	      this.dash.graphics.clear().beginFill(banker_color).drawRect(0,0,2,10);
	      this.dash.rotation = 46;
	      this.dash.regX = 1;
	      this.dash.regY = 5;
	      this.instance.addChild(this.dash);
	      break;
	      case "roach-b":
	      this.dash.graphics.clear().beginFill(player_color).drawRect(0,0,2,10);
	      this.dash.rotation = 46;
	      this.dash.regX = 1;
	      this.dash.regY = 5;
	      this.instance.addChild(this.dash);
	      break;
	    }

	  } //end of play function

	  this.ties = function (ties, options) {

	    if(options) {
	      this.dash.graphics.clear().beginFill(tie_color).drawRoundRect(0,0,options.width,options.height, (options.width/2));
	      this.dash.rotation = 46;
	      this.dash.regX = options.width/2;
	      this.dash.regY = options.height/2;
	    }

	    if(ties) {
	      this.instance.addChild(this.dash);
	      if(ties > 1) {
	        this.text.text = ties;
	        if(!_.isEmpty(options) && options.color) {
	          this.text.color = options.color;
	        } else {
	          this.text.color = '#000';
	        }
	        if(!_.isEmpty(options) && options.font) {
	          this.text.font = options.font;
	        } else {
	          this.text.font = "italic 14px lato-bold";
	        }
	        this.text.y = 0.5;
	        this.text.x = -1.5;
	        this.instance.addChild(this.text);
	      }
	    }
	  }

	  this.setDash = function(options) {
	    this.dash.rotation = 46;
	    this.dash.graphics.clear().beginFill(options.mark === 'r' ? banker_color : player_color).drawRect(0,0,options.width,options.height);
	    this.dash.regX = options.width/2;
	    this.dash.regY = options.height/2;
	  }
	}

export default { scoreboard, baccaratRoadmap }
