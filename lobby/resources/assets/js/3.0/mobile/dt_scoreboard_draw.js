let scoreboard = null;
let dragontigerRoadmap = null;

  scoreboard = function (item, mark) {
  	let instance = {};
  	let circle = null;
  	let circle_text = null;
  	let small_circle1 = null;
  	let small_circle2 = null;
  	let dash = null;

  	let dragon_color = '#1565c0';
  	let tiger_color = '#d32f2f';
  	let tie_color = '#689f38';

  	dash = new createjs.Shape();
  	dash.graphics.beginFill(tie_color).drawRect(0,0,3,32);
  	dash.rotation = 46;
  	dash.regX = 1.5;
  	dash.regY = 16;

  	switch(item) {
  		case "pearlroad" :
  			if (mark == "d"|| mark == "b"|| mark == "c" || mark == "g" || mark == "h" || mark == "i" || mark == "j") {
  				instance[mark] = new createjs.Container();
  				circle = new createjs.Shape();
  				circle.graphics.f(dragon_color).drawCircle(0,0,26);

  				circle_text = new createjs.Text("D", "bold 34px LatoBold","#fff");
  				circle_text.set({textAlign: 'center', textBaseline: 'middle', x :circle.x, y:circle.y});

  				instance[mark].addChild(circle, circle_text);
  			} else if (mark == "z"|| mark == "e"|| mark == "f" || mark == "k" || mark == "l" || mark == "m" || mark == "n") {
  				instance[mark] = new createjs.Container();
  				circle = new createjs.Shape();
  				circle.graphics.f(tiger_color).drawCircle(0,0,26);

  				circle_text = new createjs.Text("T", "bold 34px LatoBold","#fff");
  				circle_text.set({textAlign: 'center', textBaseline: 'middle', x :circle.x, y:circle.y});
  				instance[mark].addChild(circle, circle_text);

  			} else if (mark == "a"|| mark == "o"|| mark == "p" || mark == "q" || mark == "r") {
  				instance[mark] = new createjs.Container();
  				circle = new createjs.Shape();
  				circle.graphics.f(tie_color).drawCircle(0,0,26);

  				circle_text = new createjs.Text("T", "bold 34px LatoBold","#fff");
  				circle_text.set({textAlign: 'center', textBaseline: 'middle', x :circle.x, y:circle.y});
  				instance[mark].addChild(circle, circle_text);
  			} else if ( mark == "s"|| mark == "t") {
  				instance[mark] = new createjs.Container();
  				circle = new createjs.Shape();
  				circle.graphics.ss(5).s("#d6bb69").f(tie_color).drawCircle(0,0,25);

  				circle_text = new createjs.Text("T", "bold 34px LatoBold","#fff");
  				circle_text.set({textAlign: 'center', textBaseline: 'middle', x :circle.x, y:circle.y});
  				instance[mark].addChild(circle, circle_text);
  			}

  			break;

  		case "bigroad" :
  			instance.d = new createjs.Container();
  			circle = new createjs.Shape();
  			circle.graphics.ss(4).s(dragon_color).drawCircle(0,0,10);
  			instance.d.addChild(circle);

  			// tiger
  			instance.t = new createjs.Container();
  			circle = new createjs.Shape();
  			circle.graphics.ss(4).s("transparent").drawCircle(0,0,10);
  			instance.t.addChild(circle);

  			// tiger
  			instance.z = new createjs.Container();
  			circle = new createjs.Shape();
  			circle.graphics.ss(4).s(tiger_color).drawCircle(0,0,10);
  			instance.z.addChild(circle);

  			instance.s = new createjs.Container();
  			circle = new createjs.Shape();
  			circle.graphics.ss(4).s("transparent").drawCircle(0,0,10);
  			instance.s.addChild(circle);

  			//dragon big
  			instance.b = new createjs.Container();
  			circle = new createjs.Shape();
  			circle.graphics.ss(4).s(dragon_color).drawCircle(0,0,10);
  			// small_circle1 = new createjs.Shape();
  			// small_circle1.graphics.ss(.5).s("#fff").beginFill(dragon_color).drawCircle(-8,-8,4);
  			instance.b.addChild(circle/*, small_circle1*/);

  			//dragon small
  			instance.c = new createjs.Container();
  			// small_circle1 = new createjs.Shape();
  			// small_circle1.graphics.ss(.5).s("#fff").beginFill(dragon_color).drawCircle(-8,8,4);
  			instance.c.addChild(_.clone(circle)/*, _.clone(small_circle1)*/);

  			//tiger big
  			instance.e = new createjs.Container();
  			circle = new createjs.Shape();
  			circle.graphics.ss(4).s(tiger_color).drawCircle(0,0,10);
  			// small_circle1 = new createjs.Shape();
  			// small_circle1.graphics.ss(.5).s("#fff").beginFill(tiger_color).drawCircle(8,-8,4);
  			instance.e.addChild(_.clone(circle)/*, _.clone(small_circle1)*/);

  			//tiger small
  			instance.f = new createjs.Container();
  			circle = new createjs.Shape();
  			circle.graphics.ss(4).s(tiger_color).drawCircle(0,0,10);
  			// small_circle1 = new createjs.Shape();
  			// small_circle1.graphics.ss(.5).s("#fff").beginFill(tiger_color).drawCircle(8,8,4);
  			instance.f.addChild(_.clone(circle)/*, _.clone(small_circle1)*/);

  			// dragon dragon big tiger big
  			instance.g = new createjs.Container();
  			circle = new createjs.Shape();
  			circle.graphics.ss(4).s(dragon_color).drawCircle(0,0,10);
  			// small_circle1 = new createjs.Shape();
  			// small_circle1.graphics.ss(.5).s("#fff").beginFill(tiger_color).drawCircle(8,-8,4);
  			// small_circle2 = new createjs.Shape();
  			// small_circle2.graphics.ss(.5).s("#fff").beginFill(dragon_color).drawCircle(-8,-8,4);
  			instance.g.addChild(_.clone(circle)/*, _.clone(small_circle1), _.clone(small_circle2)*/);

  			// dragon dragon big tiger small
  			instance.h = new createjs.Container();
  			circle = new createjs.Shape();
  			circle.graphics.ss(4).s(dragon_color).drawCircle(0,0,10);
  			// small_circle1 = new createjs.Shape();
  			// small_circle1.graphics.ss(.5).s("#fff").beginFill(tiger_color).drawCircle(8,8,4);
  			// small_circle2 = new createjs.Shape();
  			// small_circle2.graphics.ss(.5).s("#fff").beginFill(dragon_color).drawCircle(-8,-8,4);
  			instance.h.addChild(_.clone(circle)/*, _.clone(small_circle1), _.clone(small_circle2)*/);

  			// tiger dragon small tiger big
  			instance.i = new createjs.Container();
  			circle = new createjs.Shape();
  			circle.graphics.ss(4).s(dragon_color).drawCircle(0,0,10);
  			// small_circle1 = new createjs.Shape();
  			// small_circle1.graphics.ss(.5).s("#fff").beginFill(tiger_color).drawCircle(8,-8,4);
  			// small_circle2 = new createjs.Shape();
  			// small_circle2.graphics.ss(.5).s("#fff").beginFill(dragon_color).drawCircle(-8,8,4);
  			instance.i.addChild(_.clone(circle)/*, _.clone(small_circle1), _.clone(small_circle2)*/);

  			// dragon dragon small tiger small
  			instance.j = new createjs.Container();
  			circle = new createjs.Shape();
  			circle.graphics.ss(4).s(dragon_color).drawCircle(0,0,10);
  			// small_circle1 = new createjs.Shape();
  			// small_circle1.graphics.ss(.5).s("#fff").beginFill(tiger_color).drawCircle(8,8,4);
  			// small_circle2 = new createjs.Shape();
  			// small_circle2.graphics.ss(.5).s("#fff").beginFill(dragon_color).drawCircle(-8,8,4);
  			instance.j.addChild(_.clone(circle)/*, _.clone(small_circle1), _.clone(small_circle2)*/);

  			// tiger dragon big tiger big
  			instance.k = new createjs.Container();
  			circle = new createjs.Shape();
  			circle.graphics.ss(4).s(tiger_color).drawCircle(0,0,10);
  			// small_circle1 = new createjs.Shape();
  			// small_circle1.graphics.ss(.5).s("#fff").beginFill(tiger_color).drawCircle(8,-8,4);
  			// small_circle2 = new createjs.Shape();
  			// small_circle2.graphics.ss(.5).s("#fff").beginFill(dragon_color).drawCircle(-8,-8,4);
  			instance.k.addChild(_.clone(circle)/*, _.clone(small_circle1), _.clone(small_circle2)*/);

  			// tiger dragon big tiger small
  			instance.l = new createjs.Container();
  			circle = new createjs.Shape();
  			circle.graphics.ss(4).s(tiger_color).drawCircle(0,0,10);
  			// small_circle1 = new createjs.Shape();
  			// small_circle1.graphics.ss(.5).s("#fff").beginFill(tiger_color).drawCircle(8,8,4);
  			// small_circle2 = new createjs.Shape();
  			// small_circle2.graphics.ss(.5).s("#fff").beginFill(dragon_color).drawCircle(-8,-8,4);
  			instance.l.addChild(_.clone(circle)/*, _.clone(small_circle1), _.clone(small_circle2)*/);

  			// tiger dragon small tiger big
  			instance.m = new createjs.Container();
  			circle = new createjs.Shape();
  			circle.graphics.ss(4).s(tiger_color).drawCircle(0,0,10);
  			// small_circle1 = new createjs.Shape();
  			// small_circle1.graphics.ss(.5).s("#fff").beginFill(tiger_color).drawCircle(8,-8,4);
  			// small_circle2 = new createjs.Shape();
  			// small_circle2.graphics.ss(.5).s("#fff").beginFill(dragon_color).drawCircle(-8,8,4);
  			instance.m.addChild(_.clone(circle)/*, _.clone(small_circle1), _.clone(small_circle2)*/);

  			// tiger dragon small tiger small
  			instance.n = new createjs.Container();
  			circle = new createjs.Shape();
  			circle.graphics.ss(4).s(tiger_color).drawCircle(0,0,10);
  			// small_circle1 = new createjs.Shape();
  			// small_circle1.graphics.ss(.5).s("#fff").beginFill(tiger_color).drawCircle(8,8,4);
  			// small_circle2 = new createjs.Shape();
  			// small_circle2.graphics.ss(.5).s("#fff").beginFill(dragon_color).drawCircle(-8,8,4);
  			instance.n.addChild(_.clone(circle)/*, _.clone(small_circle1), _.clone(small_circle2)*/);

  			// tie tiger big dragon big
  			instance.o = new createjs.Container();
  			circle = new createjs.Shape();
  			circle.graphics.ss(4).s(tiger_color).drawCircle(0,0,10);
  			// small_circle1 = new createjs.Shape();
  			// small_circle1.graphics.ss(.5).s("#fff").beginFill(tiger_color).drawCircle(8,-8,4);
  			// small_circle2 = new createjs.Shape();
  			// small_circle2.graphics.ss(.5).s("#fff").beginFill(dragon_color).drawCircle(-8,-8,4);
  			instance.o.addChild(_.clone(circle)/*, _.clone(small_circle1), _.clone(small_circle2)*/);

  			// tie tiger big dragon big
  			instance.r = new createjs.Container();
  			circle = new createjs.Shape();
  			circle.graphics.ss(4).s(tiger_color).drawCircle(0,0,10);
  			// small_circle1 = new createjs.Shape();
  			// small_circle1.graphics.ss(.5).s("#fff").beginFill(tiger_color).drawCircle(8,8,4);
  			// small_circle2 = new createjs.Shape();
  			// small_circle2.graphics.ss(.5).s("#fff").beginFill(dragon_color).drawCircle(-8,8,4);
  			instance.r.addChild(_.clone(circle)/*, _.clone(small_circle1), _.clone(small_circle2)*/);

  			for(var key in instance) {
  				dash.visible = false;
  				instance[key].addChild(_.clone(dash))
  			}
  			break;

  		case  "bigeyeboy":
  			instance.B = new createjs.Container();
  			circle = new createjs.Shape();
  			circle.graphics.ss(4).s(dragon_color).drawCircle(0,0,10);
  			instance.B.addChild(circle);

  			instance.R = new createjs.Container();
  			circle = new createjs.Shape();
  			circle.graphics.ss(4).s(tiger_color).drawCircle(0,0,10);
  			instance.R.addChild(circle);
  			break;

  		case  "smallroad":
  			instance.B = new createjs.Container();
  			circle = new createjs.Shape();
  			circle.graphics.beginFill(dragon_color).drawCircle(0,0,10);
  			instance.B.addChild(circle);

  			instance.R = new createjs.Container();
  			circle = new createjs.Shape();
  			circle.graphics.beginFill(tiger_color).drawCircle(0,0,10);
  			instance.R.addChild(circle);
  			break;

  		case  "cockroach":
  			instance.B = new createjs.Container();
  			dash = new createjs.Shape();
  			dash.graphics.beginFill(dragon_color).drawRect(0,0,4,28);
  			instance.B.addChild(dash);
  			dash.rotation = 45;
  			dash.regX = 2;
  			dash.regY = 14;

  			instance.R = new createjs.Container();
  			dash = new createjs.Shape();
  			dash.graphics.beginFill(tiger_color).drawRect(0,0,4,28);
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

  dragontigerRoadmap = function (radius, r2) {
    this.radius = radius;
    this.r2 = r2;
    let dragon_color = '#1565c0';
    let tiger_color = '#d32f2f';
    let tie_color = '#689f38';

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
    this.circle.graphics.beginFill(dragon_color).drawCircle(0,0,this.radius);

    this.small_circle1 = new createjs.Shape();
    this.small_circle1.graphics.ss(0.6).s("#fff").beginFill(dragon_color).drawCircle(0,0,this.r2);
    this.small_circle1.set({regX:this.radius/2, regY:this.radius/2, x : this.radius + (this.r2/2), y: this.radius + (this.r2/2)})

    this.small_circle2 = new createjs.Shape();
    this.small_circle2.graphics.ss(0.6).s("#fff").beginFill(tiger_color).drawCircle(0,0,this.r2);
    this.small_circle2.set({regX:this.radius/2, regY:this.radius/2, x: (-1)*(this.r2/2), y: (-1)*(this.r2/2)})

    this.text = new createjs.Text(window.language.locale == 'zh' ? "龙" : 'D', "18px lato-black", '#fff');
    this.text.set({textAlign:'center', textBaseline: 'middle'});

    this.play = function (mark, font, ss) {
      let r = this.radius;
      this.instance.set({regX: r*(-1), regY: r*(-1)})

      if(font) {
        this.text.font = font;
      }

      switch (mark) {
        case "pearl-d":
        this.circle.graphics.clear().beginFill(dragon_color).drawCircle(0,0,r);
        this.text.text = window.language.locale == 'zh' ? "龙" : 'D';
        this.instance.addChild(this.circle, this.text);
        break;
        case "pearl-b":
        this.circle.graphics.clear().beginFill(dragon_color).drawCircle(0,0,r);
        this.text.text = window.language.locale == 'zh' ? "龙" : 'D';
        this.instance.addChild(this.circle, this.text);
        break;
        case "pearl-c":
        this.circle.graphics.clear().beginFill(dragon_color).drawCircle(0,0,r);
        this.text.text = window.language.locale == 'zh' ? "龙" : 'D';
        this.instance.addChild(this.circle, this.text);
        break;
        case "pearl-g":
        this.circle.graphics.clear().beginFill(dragon_color).drawCircle(0,0,r);
        this.text.text = window.language.locale == 'zh' ? "龙" : 'D';
        this.instance.addChild(this.circle, this.text);
        break;
        case "pearl-h":
        this.circle.graphics.clear().beginFill(dragon_color).drawCircle(0,0,r);
        this.text.text = window.language.locale == 'zh' ? "龙" : 'D';
        this.instance.addChild(this.circle, this.text);
        break;
        case "pearl-i":
        this.circle.graphics.clear().beginFill(dragon_color).drawCircle(0,0,r);
        this.text.text = window.language.locale == 'zh' ? "龙" : 'D';
        this.instance.addChild(this.circle, this.text);
        break;
        case "pearl-j":
        this.circle.graphics.clear().beginFill(dragon_color).drawCircle(0,0,r);
        this.text.text = window.language.locale == 'zh' ? "龙" : 'D';
        this.instance.addChild(this.circle, this.text);
        break;
        case "pearl-z":
        this.circle.graphics.clear().beginFill(tiger_color).drawCircle(0,0,r);
        this.text.text = window.language.locale == 'zh' ? "虎" :'T';
        this.instance.addChild(this.circle, this.text);
        break;
        case "pearl-e":
        this.circle.graphics.clear().beginFill(tiger_color).drawCircle(0,0,r);
        this.text.text = window.language.locale == 'zh' ? "虎" :'T';
        this.instance.addChild(this.circle, this.text);
        break;
        case "pearl-f":
        this.circle.graphics.clear().beginFill(tiger_color).drawCircle(0,0,r);
        this.text.text = window.language.locale == 'zh' ? "虎" :'T';
        this.instance.addChild(this.circle, this.text);
        break;
        case "pearl-k":
        this.circle.graphics.clear().beginFill(tiger_color).drawCircle(0,0,r);
        this.text.text = window.language.locale == 'zh' ? "虎" :'T';
        this.instance.addChild(this.circle, this.text);
        break;
        case "pearl-l":
        this.circle.graphics.clear().beginFill(tiger_color).drawCircle(0,0,r);
        this.text.text = window.language.locale == 'zh' ? "虎" :'T';
        this.instance.addChild(this.circle, this.text);
        break;
        case "pearl-m":
        this.circle.graphics.clear().beginFill(tiger_color).drawCircle(0,0,r);
        this.text.text = window.language.locale == 'zh' ? "虎" :'T';
        this.instance.addChild(this.circle, this.text);
        break;
        case "pearl-n":
        this.circle.graphics.clear().beginFill(tiger_color).drawCircle(0,0,r);
        this.text.text = window.language.locale == 'zh' ? "虎" :'T';
        this.instance.addChild(this.circle, this.text);
        break;
        case "pearl-a":
        this.circle.graphics.clear().beginFill(tie_color).drawCircle(0,0,r);
        this.text.text = window.language.locale == 'zh' ? "和" :'T';
        this.instance.addChild(this.circle, this.text);
        break;
        case "pearl-o":
        this.circle.graphics.clear().beginFill(tie_color).drawCircle(0,0,r);
        this.text.text = window.language.locale == 'zh' ? "和" :'T';
        this.instance.addChild(this.circle, this.text);
        break;
        case "pearl-p":
        this.circle.graphics.clear().beginFill(tie_color).drawCircle(0,0,r);
        this.text.text = window.language.locale == 'zh' ? "和" :'T';
        this.instance.addChild(this.circle, this.text);
        break;
        case "pearl-q":
        this.circle.graphics.clear().beginFill(tie_color).drawCircle(0,0,r);
        this.text.text = window.language.locale == 'zh' ? "和" :'T';
        this.instance.addChild(this.circle, this.text);
        break;
        case "pearl-r":
        this.circle.graphics.clear().beginFill(tie_color).drawCircle(0,0,r);
        this.text.text = window.language.locale == 'zh' ? "和" :'T';
        this.instance.addChild(this.circle, this.text);
        break;
        case "pearl-s":
        this.circle.graphics.clear().ss(2).s("#d6bb69").beginFill(tie_color).drawCircle(0,0,r);
        this.text.text = window.language.locale == 'zh' ? "和" :'T';
        this.instance.addChild(this.circle, this.text);
        break;
        case "pearl-t":
        this.circle.graphics.clear().ss(2).s("#d6bb69").beginFill(tie_color).drawCircle(0,0,r);
        this.text.text = window.language.locale == 'zh' ? "和" :'T';
        this.instance.addChild(this.circle, this.text);
        break;
        //big road
        case "big-d":
        this.circle.graphics.clear().ss(ss ? ss : 3).s(dragon_color).drawCircle(0,0,r);
        this.instance.addChild(this.circle);
        break;
        case "big-t":
        this.circle.graphics.clear().ss(ss ? ss : 3).s("transparent").drawCircle(0,0,r);
        this.instance.addChild(this.circle);
        break;
        case "big-z":
        this.circle.graphics.clear().ss(ss ? ss : 3).s(tiger_color).drawCircle(0,0,r);
        this.instance.addChild(this.circle);
        break;
        case "big-s":
        this.circle.graphics.clear().ss(ss ? ss : 3).s("transparent").drawCircle(0,0,r);
        this.instance.addChild(this.circle);
        break;
        case "big-b":
        this.circle.graphics.clear().ss(ss ? ss : 3).s(dragon_color).drawCircle(0,0,r);
        this.instance.addChild(this.circle);
        case "big-c":
        this.circle.graphics.clear().ss(ss ? ss : 3).s(dragon_color).drawCircle(0,0,r);
        this.instance.addChild(this.circle);
        break;
        case "big-e":
        this.circle.graphics.clear().ss(ss ? ss : 3).s(tiger_color).drawCircle(0,0,r);
        this.instance.addChild(this.circle);
        break;
        case "big-f":
        this.circle.graphics.clear().ss(ss ? ss : 3).s(tiger_color).drawCircle(0,0,r);
        this.instance.addChild(this.circle);
        break;
        case "big-g":
        this.circle.graphics.clear().ss(ss ? ss : 3).s(dragon_color).drawCircle(0,0,r);
        this.instance.addChild(this.circle);
        break;
        case "big-h":
        this.circle.graphics.clear().ss(ss ? ss : 3).s(dragon_color).drawCircle(0,0,r);
        this.instance.addChild(this.circle);
        break;
        case "big-i":
        this.circle.graphics.clear().ss(ss ? ss : 3).s(dragon_color).drawCircle(0,0,r);
        this.instance.addChild(this.circle);
        break;
        case "big-j":
        this.circle.graphics.clear().ss(ss ? ss : 3).s(dragon_color).drawCircle(0,0,r);
        this.instance.addChild(this.circle);
        break;
        case "big-k":
        this.circle.graphics.clear().ss(ss ? ss : 3).s(tiger_color).drawCircle(0,0,r);
        this.instance.addChild(this.circle);
        break;
        case "big-l":
        this.circle.graphics.clear().ss(ss ? ss : 3).s(tiger_color).drawCircle(0,0,r);
        this.instance.addChild(this.circle);
        break;
        case "big-m":
        this.circle.graphics.clear().ss(ss ? ss : 3).s(tiger_color).drawCircle(0,0,r);
        this.instance.addChild(this.circle);
        break;
        case "big-n":
        this.circle.graphics.clear().ss(ss ? ss : 3).s(tiger_color).drawCircle(0,0,r);
        this.instance.addChild(this.circle);
        break;
        case "big-o":
        this.circle.graphics.clear().ss(ss ? ss : 3).s(tiger_color).drawCircle(0,0,r);
        this.instance.addChild(this.circle);
        break;
        case "big-r":
        this.circle.graphics.clear().ss(ss ? ss : 3).s(tiger_color).drawCircle(0,0,r);
        this.instance.addChild(this.circle);
        break;
        case "bigeye-b":
        this.circle.graphics.clear().ss(ss ? ss : 3).s(dragon_color).drawCircle(0,0,r);
        this.instance.addChild(this.circle);
        break;
        case "bigeye-r":
        this.circle.graphics.clear().ss(ss ? ss : 3).s(tiger_color).drawCircle(0,0,r);
        this.instance.addChild(this.circle);
        break;
        case "small-b":
        this.circle.graphics.clear().beginFill(dragon_color).drawCircle(0,0,r);
        this.instance.addChild(this.circle);
        break;
        case "small-r":
        this.circle.graphics.clear().beginFill(tiger_color).drawCircle(0,0,r);
        this.instance.addChild(this.circle);
        break;
        case "roach-b":
        this.dash.graphics.clear().beginFill(dragon_color).drawRect(0,0,2,9);
        this.dash.rotation = 46;
        this.dash.regX = 1;
        this.dash.regY = 5;
        this.instance.addChild(this.dash);
        break;
        case "roach-r":
        this.dash.graphics.clear().beginFill(tiger_color).drawRect(0,0,2,9);
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
      this.dash.graphics.clear().beginFill(options.mark === 'r' ? tiger_color : dragon_color).drawRect(0,0,options.width,options.height);
      this.dash.regX = options.width/2;
      this.dash.regY = options.height/2;
    }
  }

// export default() => {scoreboard, dragontigerRoadmap }
export default {scoreboard, dragontigerRoadmap }
