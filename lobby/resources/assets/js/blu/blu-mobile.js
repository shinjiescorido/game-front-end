/**
 *
 */
export default() => {
	var BLU = {
		isFunction: function(param) {
			return typeof param === "function";
		},
		cycle: {
			init: function(settings) {

				settings = $.extend({
					context: null,
					resources: null,
					init: null,
					start: null,
					main: null,
					isFirstLoad: false,
					preloader: new createjs.LoadQueue(true),
					delay: 0,
					timeoutId: null,
					onAdded: null,
					onRemoved: null,
					loop: null,
					loaded_asset: function () {}
				}, settings);

				Object.keys(settings).forEach(function(key) {
					if(key != "run") {
						this[key] = settings[key];
					}
				}.bind(this));

				this.preloader.on("progress", function(e) {
					this.loading && this.loading(e.progress);
				}.bind(this));

				this.preloader.on("fileload", function(e){
					this.loaded_asset(e.item._comments);
				}.bind(this));

				this.runHeart = function() {
					this.timeoutId = setTimeout(function() {
						if(this.hasOwnProperty("alpha")) this.alpha = 1;
						this.main && this.main();
						this.stage && this.stage.update();
						this.isFirstLoad = true;
					}.bind(this), this.delay);
				}

				this.preloader.on("complete", this.runHeart.bind(this));

				this.getResources = function(key) {
					return this.preloader.getResult(key);
				}.bind(this);

			},//End of init
			run: function() {

				if(this.hasOwnProperty("alpha")) this.alpha = 0;
				if(!this.isFirstLoad) {
					this.init && this.init();
				}
				if(this.resources) {
					this.start && this.start()
					$.getJSON(this.resources, function(data) {
						createjs.Sound.alternateExtensions = ["mp3"];
						this.preloader.installPlugin(createjs.Sound);
						this.preloader.loadManifest(data);

					}.bind(this));
				} else {
					this.start && this.start()
					this.runHeart();
					this.isFirstLoad = true;
				}

			}
		}//End of appCycle
	};

	/**
	 * BLU list of factory function.
	 * @type {Object}
	 */
	BLU.Factory = {};
	BLU.Factory.createButton = function(settings) {

		var btn = null;

		settings = $.extend({
			img: null,
			type: 'btn-sprite',
			width: 0,
			height: 0,
			out: 0,
			over: 0,
			down: 1,
			disabled: 2,
			isButtonHelper: true,
		}, settings);

		switch(settings.type) {

			case "btn-sprite":

				if(settings.img === null) return null;

				var spriteSheet = new createjs.SpriteSheet({
					images: [settings.img],
					frames: {width: settings.width, height: settings.height},
					animations: {
						out: settings.out,
						over: settings.over,
						down: settings.down,
						disabled: settings.disabled,
					}
				});

				var sprite = new createjs.Sprite(spriteSheet);

				if( settings.isButtonHelper )
					var button = new createjs.ButtonHelper(sprite);

                sprite.regX = settings.width / 2;
                sprite.regY = settings.height / 2;

				btn = sprite;

				break;

		}//End of switch statement

		return btn;

	};//End of createButton function

	BLU.Component = function(settings) {

		this.Container_constructor();

		settings = $.extend({
			main: null,
			context: null
		}, settings);

		Object.keys(settings).forEach(function(key) {
				this[key] = settings[key];
		}.bind(this));

	};

	createjs.extend(BLU.Component, createjs.Container);
	BLU.Component = createjs.promote(BLU.Component, "Container");

	/**
	 * createjs Stage class extension going it fluid.
	 * @param  {String} canvas     canvas id.
	 * @param  {Number} baseWidth  canvas base width.
	 * @param  {Number} baseHeight canvas base height.
	 */
	BLU.FluidStage = function(canvas, baseWidth, baseHeight, chansResize) {
		this.Stage_constructor(canvas);
		this.baseWidth = baseWidth || 300;
		this.baseHeight = baseHeight || 200;
		//this.mobileDevice = this.getMobileOperatingSystem(); // "Windows Phone", "Android", "iOS"
		this.resize(window.innerWidth, window.innerHeight);
		// alert(window.innerHeight)

		window.addEventListener("resize", function() {
			this.resize(window.innerWidth, window.innerHeight);
			this.update();
		}.bind(this));

	};

	createjs.extend(BLU.FluidStage, createjs.Stage);

	BLU.FluidStage.prototype.resize = function(newWidth, newHeight) {

		var baseRatio = this.baseWidth / this.baseHeight,
			newRatio = newWidth / newHeight;

		if(newRatio > baseRatio) {
			newWidth = newHeight * baseRatio;
		} else {
			newHeight = newWidth / baseRatio;
		}

		this.canvas.width = 1280;
		this.canvas.height = 720;
		/*$('#video-player').width(newWidth);
		$('#video-player').height(newHeight);*/

		//this.scaleX = this.scaleY = newWidth / this.baseWidth;
		$('#SUPER-CONTAINER').css({
		 	'transform': 'scale('+((newWidth / 1280) )+')'
	 	})
	 	// alert("scale: "+(newWidth / 1280)+ "--width: "+newWidth +"--height: "+newHeight);
	};

	BLU.FluidStage = createjs.promote(BLU.FluidStage, "Stage");

	/**
	 * Used for individual screen in a game.
	 * @param {Object} settings The screen settings
	 */
	BLU.Screen = function(settings) {
		this.Container_constructor();

		BLU.cycle.init.call(this, settings);

		this.on("added", function() {
			this.onAdded && this.onAdded();
			this.run();
		}.bind(this));

		this.on("removed", function() {
			clearTimeout(this.timeoutId);
			this.onRemoved && this.onRemoved();
			this.alpha = 0;
		}.bind(this));

	};

	createjs.extend(BLU.Screen, createjs.Container);

	BLU.Screen.prototype.run = function() {
		BLU.cycle.run.call(this);
	};

	BLU.Screen.prototype.addComponent = function(component) {
		this.addChild(component);
		component.context = this;
		component.main();
	};

	BLU.Screen = createjs.promote(BLU.Screen, "Container");

	/**
	 * Used for wrapping your app.
	 * @param {Object} settings The settings of your app
	 */
	BLU.App = function(settings) {

		settings = $.extend({
			canvas: null,
			stage: null,
			width: 1280,
			height: 720,
			delay: 0,
			screens: {},
			currentScreen: null,
			tickEnabled: false,
		}, settings);

		BLU.cycle.init.call(this, settings);
		this.stage = new BLU.FluidStage(this.canvas, this.width, this.height);
		// new createjs.Touch.enable(this.stage);

		if(this.tickEnabled) {
			createjs.Ticker.addEventListener("tick", function(e) {
				this.loop && this.loop(e);
				if(this.currentScreen && this.currentScreen.loop) {
					this.currentScreen.loop(e);
				}
				this.stage.update();
			}.bind(this));
			createjs.Ticker.setFPS(8);
		}

	};

	BLU.App.prototype = {
		constructor: BLU.App,
		run: function() {
			BLU.cycle.run.call(this);
		},
		register: function(screenName, screenObject) {
			this.screens[screenName] = screenObject;
			this.screens[screenName].context = this;
		},
		load: function(screenName) {

			if(this.currentScreen) {
				this.stage.removeChild(this.currentScreen);
			}

			this.currentScreen = this.screens[screenName];
			this.stage.addChild(this.currentScreen);

		}
	};

	/**
	 * XSprite sprite extension
	 * @constructor
     */
	BLU.XSprite = function(spriteSheetSettings) {

		var spriteSheet = new createjs.SpriteSheet(spriteSheetSettings);
		this.Sprite_constructor(spriteSheet);

	};

	createjs.extend(BLU.XSprite, createjs.Sprite);
	BLU.XSprite = createjs.promote(BLU.XSprite, "Sprite");

    /**
     * v0.1
     * Observer class for observing something.
     * @constructor
     */
	BLU.Observer = function() {
		this.listeners = {
			loaded: [

			]
		};
	};

	BLU.Observer.prototype = {
		constructor: BLU.Observer,
		on: function(eventName, handler) {

			if(!this.listeners[eventName]) this.listeners[eventName] = [];
			this.listeners[eventName].push(handler);

		},
		off: function(eventName, handler) {
			if(this.listeners[eventName]) {

                var len = this.listeners[eventName].length;
                for(var i = len; i >= 0; i--) {
                    if(this.listeners[eventName][i] === handler) {
                        this.listeners[eventName].splice(i, 1);
                    }
                }

                len = this.listeners[eventName].length;
                if(len === 0) {
                    delete this.listeners[eventName];
                }

            }
		},
		emit: function(eventName, args) {
            if(this.listeners[eventName]) {
                for(var i = 0, len = this.listeners[eventName].length; i < len; i++) {
                    this.listeners[eventName][i](args);
                }
            }
		}
	};



	/**
	 * BLU object return
	 */
	return BLU;

}();
