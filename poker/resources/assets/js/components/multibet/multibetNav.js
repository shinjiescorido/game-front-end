let instance = null;

export default() => {
	instance = instance || new blu.Component({
		row : 0,
		main() {

			let arrow = new createjs.Container();
			arrow.x = 55;
			arrow.y = 38;
			arrow.rotation = 180;
			this.addChild(arrow);

			let hit1 = new createjs.Shape();
			hit1.graphics.beginFill("rgba(255,255,225,.01)").drawRect(0,0,30,30);
			this.arr11 = new createjs.Shape();
			this.arr11.fillCmd = this.arr11.graphics.beginFill(this.context.theme_color[window.theme].multibetnav_arrow).command;
			this.arr11.graphics.drawRoundRect(-4,6,5,26,3);
			this.arr11.rotation = -55;

			this.arr12 = new createjs.Shape();
			this.arr12.fillCmd = this.arr12.graphics.beginFill(this.context.theme_color[window.theme].multibetnav_arrow).command;
			this.arr12.graphics.drawRoundRect(6,-2,5,26,3);
			this.arr12.rotation = 55;
			arrow.addChild(hit1, this.arr11,this.arr12)

			let arrow2 = new createjs.Container();
			arrow2.set({x: 165, y: 14});
			this.addChild(arrow2);

			let hit2 = new createjs.Shape();
			hit2.graphics.beginFill("rgba(255,255,225,.01)").drawRect(0,0,30,30);
			this.arr1 = new createjs.Shape();
			this.arr1.fillCmd = this.arr1.graphics.beginFill(this.context.theme_color[window.theme].multibetnav_disabled_arrow).command
			this.arr1.graphics.drawRoundRect(-4,6,5,26,3);
			this.arr1.rotation = -55;

			this.arr2 = new createjs.Shape(); 
			this.arr2.fillCmd = this.arr2.graphics.beginFill(this.context.theme_color[window.theme].multibetnav_disabled_arrow).command;
			this.arr2.graphics.drawRoundRect(6,-2,5,26,3);
			this.arr2.rotation = 55;

			arrow2.addChild(hit2,this.arr1,this.arr2);
			this.y = 850;

      let gamescontainer = this.context.component_multibet.all_games_container;
      let selectedgames = this.context.component_multibet.selected_games;
			arrow.on("click", () => {
        arrowUpDown.call(this, "up");
			});

			arrow2.on("click", () => {
        arrowUpDown.call(this, "down");
			});

      let wheelHitArea = this.context.component_multibet;
      wheelHitArea.addEventListener("mouseover", (e) => {
      	window.addEventListener("wheel", scroller);
      });
	    	
	    wheelHitArea.addEventListener("mouseout", (e) => {
      	window.removeEventListener("wheel", scroller);
      });

      function arrowUpDown (direction) {
				let c = checkBounds.call(this);

				arrow.alpha = arrow2.alpha = 1;

  			arrow.children[1].fillCmd.style = this.context.theme_color[window.theme].multibetnav_arrow
  			arrow.children[2].fillCmd.style = this.context.theme_color[window.theme].multibetnav_arrow
  			arrow2.children[1].fillCmd.style = this.context.theme_color[window.theme].multibetnav_arrow
  			arrow2.children[2].fillCmd.style = this.context.theme_color[window.theme].multibetnav_arrow
		
    		let shift_Y = (self.context.component_multibet.g_height * (5 - (self.context.component_multibet.selected_games.length + c.check.length)));
    		
    		if(direction == "up") shift_Y = shift_Y * -1;
    		
    		let to_Y = this.context.component_multibet.all_games_container.y + shift_Y;
    		
    		if(to_Y >= c.top) {
      			arrow2.children[1].fillCmd.style = this.context.theme_color[window.theme].multibetnav_disabled_arrow
      			arrow2.children[2].fillCmd.style = this.context.theme_color[window.theme].multibetnav_disabled_arrow
      			to_Y = c.top;
        }

    		if(to_Y <= c.bottom) {
      			// arrow.alpha = 0.5;
      			arrow.children[1].fillCmd.style = this.context.theme_color[window.theme].multibetnav_disabled_arrow
      			arrow.children[2].fillCmd.style = this.context.theme_color[window.theme].multibetnav_disabled_arrow
      			to_Y = c.bottom;
    		}

				createjs.Tween.get(this.context.component_multibet.all_games_container)
				.to({ y : to_Y },100);

      } // end of function arrowUpDown

      var self = this;

      function checkBounds() {
      	let check = _.filter(selectedgames, (e)=>{
				if(e.game.indexOf("icbo") > -1) {
						return e;
					}
				});
	      
	      let top = 0;
				let lastChild = self.context.component_multibet.all_games_container.getChildAt(self.context.component_multibet.all_games_container.numChildren - 1);
					
				let diff = 0;
				if(selectedgames.length) {
					diff = _.find(self.context.component_multibet.selected_games, {game: '1_Sicbo'}) ? ((self.context.component_multibet.selected_games.length+1)*self.context.component_multibet.g_height) : (self.context.component_multibet.selected_games.length*self.context.component_multibet.g_height);
				}

				let bottom = -1 * (lastChild.y - 690) - diff;
			// let bottom = lastChild && self.context.component_multibet.all_games_container.numChildren > 4 ? -1 * (lastChild.y - 690) - diff:  0;
      	return {"top":top, "bottom":bottom, "check":check}
      }

      function scroller(e) {
				let c = checkBounds.call(this);
		    if(self.context.component_multibet.all_games_container.y <= c.top && self.context.component_multibet.all_games_container.y >= c.bottom){
		      	self.context.component_multibet.all_games_container.y -= Math.floor(e.deltaY);
      		arrow2.children[1].fillCmd.style = self.context.theme_color[window.theme].multibetnav_arrow
      		arrow2.children[2].fillCmd.style = self.context.theme_color[window.theme].multibetnav_arrow
      		
      		arrow.children[1].fillCmd.style = self.context.theme_color[window.theme].multibetnav_arrow
      		arrow.children[2].fillCmd.style = self.context.theme_color[window.theme].multibetnav_arrow
		    }
		    
		    if (self.context.component_multibet.all_games_container.y > c.top) { 
      		arrow2.children[1].fillCmd.style = self.context.theme_color[window.theme].multibetnav_disabled_arrow
      		arrow2.children[2].fillCmd.style = self.context.theme_color[window.theme].multibetnav_disabled_arrow
      		
      		arrow.children[1].fillCmd.style = self.context.theme_color[window.theme].multibetnav_arrow
      		arrow.children[2].fillCmd.style = self.context.theme_color[window.theme].multibetnav_arrow
		    	self.context.component_multibet.all_games_container.y = c.top;
		    }
		    if (self.context.component_multibet.all_games_container.y < c.bottom)   {
		    	self.context.component_multibet.all_games_container.y = c.bottom;
      		arrow.children[1].fillCmd.style = self.context.theme_color[window.theme].multibetnav_disabled_arrow
      		arrow.children[2].fillCmd.style = self.context.theme_color[window.theme].multibetnav_disabled_arrow

      		arrow2.children[1].fillCmd.style = self.context.theme_color[window.theme].multibetnav_arrow
      		arrow2.children[2].fillCmd.style = self.context.theme_color[window.theme].multibetnav_arrow
		    }
		  } // end function scroller

		},
		changeTheme (new_theme) {
			this.arr11.graphics.clear().beginFill(this.context.theme_color[new_theme].multibetnav_arrow).drawRoundRect(-4,6,5,26,3);
			this.arr12.graphics.clear().beginFill(this.context.theme_color[new_theme].multibetnav_arrow).drawRoundRect(6,-2,5,26,3);
			this.arr1.graphics.clear().beginFill(this.context.theme_color[new_theme].multibetnav_arrow).drawRoundRect(-4,6,5,26,3);
			this.arr2.graphics.clear().beginFill(this.context.theme_color[new_theme].multibetnav_arrow).drawRoundRect(6,-2,5,26,3);
		}
	});

	return instance;
}
