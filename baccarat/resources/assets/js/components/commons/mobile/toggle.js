import {createSprite, randomNum, getSlaveParam} from '../../../factories/factories';

let instance = null;

export default (config) => {
	instance = instance || new blu.Component({
		main () {
			
			this.supersixPosition = this.context.stage.canvas.width *(-1);
			this.classicPosition = 0;

			this.supersixIndicator = new createjs.Shape();
			this.supersixIndicator.fillCmd = this.supersixIndicator.graphics.ss(2).s("#fff").f("transparent").command;
			this.supersixIndicator.graphics.drawCircle(0,0,5);
			this.supersixIndicator.y = 750
			this.supersixIndicator.x = (this.context.stage.canvas.width/2) + 10;
      this.supersixIndicator.visible = _.isEmpty(window.vendorData);

      this.classicIndicator = new createjs.Shape();
      this.classicIndicator.fillCmd = this.classicIndicator.graphics.ss(2).s("#fff").f("#fff").command;
      this.classicIndicator.graphics.drawCircle(0,0,5);
      this.classicIndicator.x = (this.context.stage.canvas.width/2) - 10;
      this.classicIndicator.y = 750
      this.classicIndicator.visible = _.isEmpty(window.vendorData);

			this.context.component_betBoard.x = this.classicPosition
			// attempt at swipe2x;
      var c= document.getElementById("myCanvas");
      this.mc = new Hammer(c);

      this.mc.on("pan", (e) => {
        if(window.junket && !_.isEmpty(window.vendorData)) return;
        this.handleDrag(e);
      });


      this.mc.on("panend", (e) => {
        if(window.junket && !_.isEmpty(window.vendorData)) return;
        console.log("panend", e)
        this.handleEnd(e);
      });

		},
		isDrag: false,
		lastX : 0,
    posX:0,
    direction: 0,
    handleDrag(e) {
    	if(this.context.component_gameButtons.yourBets.length) {
				this.context.component_messages.setMessage(window.language2.com_sub_ingameprompts_unabletochange,1);
        return;
      }

      let w = window.innerWidth;
      let h = window.innerHeight;

      let offSetY = 0;

      if(this.context.portrait) {
        if(e.center.y < (h/2) - (h * 0.25) || e.center.y > (h/2) + (h * 0.08)) return;
      } else {
        if(e.center.y < (h/2) + (h * 0.07) || e.center.y > (h/2) + (h * 0.24)) return;
      }

    	if(e.direction != 2 && e.direction != 4) return; //
      this.posX =this.lastX + (e.deltaX);
      
      if(!this.isDrag) {
      	this.isDrag = true
      }

      this.direction = e.direction;
      this.context.component_betBoard.x = this.posX;

    },
    handleEnd (e) {

      if(this.direction != 2 && this.direction != 4) return; //

      if(this.posX < this.supersixPosition) this.posX = this.supersixPosition;
      if(this.posX > 0) this.posX = this.classicPosition;
      this.context.component_betBoard.x = this.posX;
      this.isDrag = false;

      console.log(
        "lastX::",this.lastX,
        "\nPOSX::", this.posX,
        "\ndeltaX::", e.deltaX,
        "\nbetboard X::",this.context.component_betBoard.x,
        "\ndeltaTime::",e.deltaTime,
        "\ndirection::", e.direction
      );

      if(e.deltaTime < 200) { //swipe
        if(this.direction == 2) {
          this.posX = this.supersixPosition;
          this.swipeLeft(e);
        }
        if(this.direction == 4) {
          this.posX = this.classicPosition;
          this.swipeRight(e);
        }
        createjs.Tween.get(this.context.component_betBoard)
        .to({
          x : this.posX
        }, e.deltaTime)
      } else  { //if up
        if(this.posX != this.supersixPosition || this.posX != this.classicPosition) {
          if(this.direction == 2) {
            this.posX = this.supersixPosition;
            this.swipeLeft(e);
          }
          if(this.direction == 4) {
            this.posX = this.classicPosition;
            this.swipeRight(e);
          }
          this.lastX = this.posX;
          createjs.Tween.get(this.context.component_betBoard)
          .to({
            x : this.posX
          }, 150)
        }
      }

      this.lastX = this.posX;
    },
    swipeLeft() {
    	window.slave = 'supersix';
    	this.supersixIndicator.fillCmd.style = '#fff';
    	this.classicIndicator.fillCmd.style = 'transparent';
      $.post("/setGameSettings", {slave : window.slave !== '' ? window.slave : 'classic', game: `Baccarat/${window.tableNum}`});
    },
    swipeRight() {
    	window.slave = '';
    	this.supersixIndicator.fillCmd.style = 'transparent';
    	this.classicIndicator.fillCmd.style = '#fff';
      $.post("/setGameSettings", {slave : window.slave !== '' ? window.slave : 'classic', game: `Baccarat/${window.tableNum}`});
    },
		toggleRange (range) {
			let selectedRange = _.filter(window.allRange, function(e) {
        return parseInt(e.max) === parseInt(range.split('-')[1]) && parseInt(e.min) === parseInt(range.split('-')[0]);
      })[0];
      //Main area range
      let mainMultiplier = (Math.floor(parseInt(window.mainMultiplier) / 10) * 10) * 0.01;
      if (window.mainMultiplier % 10) mainMultiplier = 1;
      let mainAreaMin = (selectedRange.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
      let mainAreaMax = ((selectedRange.max * parseInt(window.currencyMultiplier)) * window.userMultiplier) * mainMultiplier;

      //Side bet ranges
      let sideBet = [];
      for (var i = 0; i < selectedRange.side_bet.length; i++) {
      	sideBet = selectedRange.side_bet[i];
        switch (sideBet.division) {
            case ('Player Pair - Banker Pair'):
              let pairMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
              let pairMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
              break;

            case ('Tie'):
              let tieMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
              let tieMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
              break;

            case ('Super 6'):
              let superMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
              let superMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
              break;

            case ('Big - Small'):
              let sizeMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
              let sizeMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
              break;

            case ('Bonus'):
              let bonusMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
              let bonusMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
              break;
          }
        }

        this.context.component_betBoard.bet_areas.forEach((e) => {
          if(e.table_name.indexOf('tie') >-1) {
            e.min_betAmt = tieMin;
            e.max_betAmt = tieMax;
          }

          if(e.table_name =='player' || e.table_name == 'banker') {
            e.min_betAmt = mainAreaMin;
            e.max_betAmt = mainAreaMax;
          }

          if(e.table_name.indexOf('pair') >-1) {
            e.min_betAmt = pairMin;
            e.max_betAmt = pairMax;
          }

          if(e.table_name === 'supersix') {
            e.min_betAmt = superMin;
            e.max_betAmt = superMax;
          }

          if(e.table_name === 'big' || e.table_name === 'smal') {
            e.min_betAmt = sizeMin;
            e.max_betAmt = sizeMax;
          }

          if(e.table_name.indexOf('bonus') >-1) {
            e.min_betAmt = bonusMin;
            e.max_betAmt = bonusMax;
          }
        });
		},
    screenOrientation() {
      let y = this.context.stage.canvas.height - 152;
      let outlineY = 425;
      if(this.context.portrait) {
          y = 750;
          outlineY = 318;
      }
      this.supersixIndicator.y = y
      this.supersixIndicator.x = (this.context.stage.canvas.width/2) + 10;

      this.classicIndicator.x = (this.context.stage.canvas.width/2) - 10;
      this.classicIndicator.y = y;

      this.supersixPosition = this.context.stage.canvas.width *(-1);
      this.classicPosition = 0;
      if(window.slave == 'supersix') {
        this.context.component_betBoard.x = this.supersixPosition;
      } else {
        this.context.component_betBoard.x = this.classicPosition;
      }
      this.lastX = this.context.component_betBoard.x;

      this.context.component_tableDraw.classic_outline.x = this.classicPosition +12;
      this.context.component_tableDraw.classic_outline.y = outlineY
      this.context.component_tableDraw.supersix_outline.x = this.supersixPosition * (-1) + 12;
      this.context.component_tableDraw.supersix_outline.y = outlineY;

      this.context.component_tableDraw.classic_outline_landscape.x = this.classicPosition +12;
      this.context.component_tableDraw.classic_outline_landscape.y = outlineY;
      this.context.component_tableDraw.supersix_outline_landscape.x = this.supersixPosition * (-1) + 12;
      this.context.component_tableDraw.supersix_outline_landscape.y = outlineY;

      //visibility of outlines
      this.context.component_tableDraw.classic_outline.visible = this.context.portrait;
      this.context.component_tableDraw.supersix_outline.visible = this.context.portrait;
      this.context.component_tableDraw.classic_outline_landscape.visible = !this.context.portrait;
      this.context.component_tableDraw.supersix_outline_landscape.visible = !this.context.portrait;


      this.context.component_multiplayer.classicMulti_outline.visible = false;
      this.context.component_multiplayer.superMulti_outline.visible = false;
      //balance bet
      if(this.context.isBalance) {
        this.context.component_multiplayer.classicMulti_outline.y = outlineY;
        this.context.component_multiplayer.superMulti_outline.y = outlineY;
        this.context.component_multiplayer.classicMulti_outline.x = this.context.component_tableDraw.classic_outline.x;
        this.context.component_multiplayer.superMulti_outline.x = this.context.component_tableDraw.supersix_outline.x;

        if(!this.context.portrait) {
          this.context.component_multiplayer.classicMulti_outline.visible = false;
          this.context.component_multiplayer.superMulti_outline.visible = false;
        } else  {
          this.context.component_multiplayer.superMulti_outline.visible = true;
          this.context.component_multiplayer.classicMulti_outline.visible = true;
          this.context.component_tableDraw.classic_outline.visible = false;
          this.context.component_tableDraw.supersix_outline.visible = false;
        }
      }

    }
	})
	
	return instance;
}