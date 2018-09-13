import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas } from '../factories/factories';
import listPulaputi from './factory/l_pulaputi';
import listBigWheel from './factory/l_bigwheel';
import all from './factory/l_themedGames_all';

let instance = null;

export default() => {
	instance = instance || new blu.Component({
		all_list_table : [],
		main() {

			this.y = 72;

			let bg = new createjs.Shape();
			bg.graphics.beginFill("#4d4d4d").drawRect(0,0,this.context.context.width - this.context.body_bg_width,1050);
			this.addChild(bg);

			let bg_mask = new createjs.Shape();
			bg_mask.graphics.beginFill("red").drawRect(0,230,this.context.context.width - this.context.body_bg_width,1050-230);

			this.visible = false;
      		this.dealer = {};

			let parent = new createjs.Container();
			parent.x = 16;
			parent.y = 250;
			parent.mask = bg_mask;
			this.addChild(parent);

			this.list_view = new createjs.Container();
			this.list_view.x = 16;
			this.list_view.y = 250;
			this.list_view.mask = bg_mask;
			this.list_view.visible = true;
			this.addChild(this.list_view);
		},
		setMaintenance (data, x) {
			switch (data.eventName)  {
				case "maintenanceChange" :
					if (data.gameName == 'Pula-Puti') {
						listPulaputi(this,data,x).checkMaintenance(data.data.status, true);
					}
					if (data.gameName == 'Big-Wheel') {
						listBigWheel(this,data,x).checkMaintenance(data.data, true);
					}
					break;
			}
		},
		setResult(data, gameName, tId, eventName) {
			for(var x = 0; x < data.length; x++) {
				if(gameName != data[x].gameName || tId != data[x].tableNumber) {
					continue;
				}

				switch (data[x].gameName)  {
					case "Pula-Puti" :
						listPulaputi(this,data[x],x).setResult(data[x]);
						listPulaputi(this,data[x],x).drawRoadMap(data[x].marks);
						listPulaputi(this,data[x],x).setStatsCount(data[x]);
						listPulaputi(this,data[x],x).setResultText(data[x].marks, eventName);
						listPulaputi(this,data[x],x).animateDice(data[x].marks);
						break;
					case "Big-Wheel" :
						listBigWheel(this,data[x],x).setResult(data[x]);
						break;
				}

			}
		},
		makeListTables (data, parent, child) {
      parent.y = 250;
			all(parent.parent, data).makeListTables();

			for(var x = 0; x < data.length; x++) {
				if(data[x].gameName == "Big-Wheel") {
					listBigWheel(parent.parent,data[x],x).createTable();
				} else if(data[x].gameName == "Pula-Puti") {
					listPulaputi(parent.parent,data[x],x).createTable();
				}
			}

      if(this.list_view.children.length > 0) {
        if(!this.list_view.scrollprop) {
          this.list_view.setBounds(0, 0, 1680, this.list_view.getBounds().height);
  		    this.list_view.scrollprop = this.context.lobby_scrollbar.scrollable(this, this.list_view, 1680, 850);
        }
        else {
          // this.list_view.scrollprop.scrollbar.y = this.list_view.scrollprop.top;
        }

      }

		},
		reInitAnim(data, x) {
			switch (data.gameName)  {
				case "Pula-Puti" :
        			listPulaputi(this,data[x],x).reInitAnim();
      				break;
			}
		}
	});

	return instance;
}
