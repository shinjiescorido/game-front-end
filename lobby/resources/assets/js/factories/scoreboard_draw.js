let scoreboard = null;

export default() => {
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

	return scoreboard;
}
