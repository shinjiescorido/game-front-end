
;var POKER = POKER || {};

(function() {

	"use strict";

	new BLU.App({
		
		canvas: "poker_lobby",
		tickEnabled:true,
		socket: null,

		main: function() {
			this.register("lobby", POKER.screens.lobby);			
			this.load("lobby");

			var scaleValue = 1;

			var newWidth = window.innerWidth;
			var newHeight = window.innerHeight;

			var baseRatio = 1280 / 720,
					newRatio = newWidth / newHeight;

			if(newRatio > baseRatio) {
				newWidth = newHeight * baseRatio;
			} else {
				newHeight = newWidth / baseRatio;
			}

			/*this.canvas.width = newWidth;
			this.canvas.height = newHeight;
			$('#video-player').width(newWidth);
			$('#video-player').height(newHeight);*/

			//this.scaleX = this.scaleY = newWidth / this.baseWidth;

			$(".dom-ui-container").css({
				/*width: this.stage.canvas.width,
				height: this.stage.canvas.height,*/
				transform: 'scale('+(newWidth / 1280)+')'
			});

			$('#header').css({width:this.stage.canvas.width});
			$('#footer').css({width:this.stage.canvas.width});

			$(".dom-resizable").css({
				transform: "scale(" + (scaleValue + 0.4) + ")"
			});

			//$('#canvas-container').css({height: this.stage.canvas.height - $('#header').height() - $('#footer').height()});

			$(window).on("resize", function() {

				var newWidth = window.innerWidth;
				var newHeight = window.innerHeight;

				var baseRatio = 1280 / 720,
						newRatio = newWidth / newHeight;

				if(newRatio > baseRatio) {
					newWidth = newHeight * baseRatio;
				} else {
					newHeight = newWidth / baseRatio;
				}

				$(".dom-ui-container").css({
					/*width: this.stage.canvas.width,
					height: this.stage.canvas.height*/
					transform: 'scale('+(newWidth / 1280)+')'
				});

				scaleValue = this.stage.canvas.width / 1280;

				$(".dom-resizable").css({
					transform: "scale(" + (scaleValue + 0.4) + ")"
				});
				$('#header').css({width:this.stage.canvas.width});
				$('#footer').css({width:this.stage.canvas.width});

				//$('#canvas-container').css({height: this.stage.canvas.height - $('#header').height() - $('#footer').height()});

			}.bind(this));
		}
		
	}).run();

})();
