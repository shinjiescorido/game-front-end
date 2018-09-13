let instance = null;
import listBaccarat from './factory/l_baccarat';
import all from './factory/l_all';
import rmformat from '../factories/formatter';

let formatData = rmformat();

export default() => {
	instance = instance || new blu.Component({
		all_thumbnial_table: [],
		all_list_table: [],
		main() {

		    this._modalWidth = 450;
		    this._modalHeight = 750;

			// this.y = 72;

			// let bg = new createjs.Shape();
			// bg.graphics.beginFill("#4d4d4d").drawRect(0,0,this.context.context.width - this.context.body_bg_width,1050);
			// this.addChild(bg);

			this.visible = false;

			this.thumbnail_view = new createjs.Container();
			this.thumbnail_view.x = 16;
			// this.thumbnail_view.y = 250;
			this.addChild(this.thumbnail_view);

			this.list_view = new createjs.Container();
			this.list_view.x = 16;
			// this.list_view.y = 250;
			this.list_view.visible = false;
			this.addChild(this.list_view);

		},
		setMaintenance (data, x) {
			switch (data.eventName)  {
				case "maintenanceChange" :
					all(this, data, x).checkMaintenance(data.data.status, true, x);
					listBaccarat(this,data,x).checkMaintenance(data.data.status, true, x);
					break;
			}
		},
		inputResult (data,card_data) {
			for(var x = 0; x < data.length; x++) {
				if((card_data.tableId == data[x].tableNumber) && (card_data.gameName == data[x].gameName)) {
					listBaccarat(this,data[x],x).inputRes(card_data);
				}
			}
		},
		setResult(data, gameName, tId) {
			for(var x = 0; x < data.length; x++) {
				if(data[x].gameName == "Baccarat" && data[x].tableNumber ==  tId) {
					let miscData = (data[x].slave && data[x].slave == 'supersix')?data[x]:{};
					listBaccarat(this,data[x],x).setPercentages(data[x].marks);
					listBaccarat(this,data[x],x).setResult(data[x].marks);
					listBaccarat(this,data[x],x).drawPearlRoad(formatData.fnFormatBCPearlRoad(data[x].marks,6,14,miscData),"list");
					listBaccarat(this,data[x],x).drawBigRoad(formatData.fnFormatBCBigRoad(data[x].marks,6,30,miscData),"list");
					listBaccarat(this,data[x],x).drawBigRoad(formatData.fnFormatBCBigRoad(data[x].marks,6,28,miscData),"thumbnail");
					listBaccarat(this,data[x],x).drawBigEyeBoy(formatData.fnFormatBigEyeBoy(data[x].marks,6,28),"list");
					listBaccarat(this,data[x],x).drawSmallRoad(formatData.fnFormatSmallRoad(data[x].marks,6,28),"list");
					listBaccarat(this,data[x],x).drawCockradRoad(formatData.fnFormatCockroachPig(data[x].marks,6,28),"list");
				}
			}
		},
		makeBaccaratTables (data) {
	     	// this.list_view.y = 250;
			this.all_list_table = _.clone(this.context.lobby_liveGames.all_list_table);
			all(this, data).makeListTables();

			for(var x = 0; x < data.length; x++) {
				if(data[x].gameName == "Baccarat") {
					let miscData = (data[x].slave && data[x].slave == 'supersix')?data[x]:{};
					listBaccarat(this,data[x],x).createTable();
					listBaccarat(this,data[x],x).drawPearlRoad(formatData.fnFormatBCPearlRoad(data[x].marks,6,14,miscData),"list");
					listBaccarat(this,data[x],x).drawBigRoad(formatData.fnFormatBCBigRoad(data[x].marks,6,30,miscData),"list");
					listBaccarat(this,data[x],x).drawBigEyeBoy(formatData.fnFormatBigEyeBoy(data[x].marks,6,28),"list");
					listBaccarat(this,data[x],x).drawSmallRoad(formatData.fnFormatSmallRoad(data[x].marks,6,28),"list");
					listBaccarat(this,data[x],x).drawCockradRoad(formatData.fnFormatCockroachPig(data[x].marks,6,28),"list");
    			}
			}

    	if(this.list_view.children.length > 0) {
        if(!this.list_view.scrollprop) {
          this.list_view.setBounds(0, 0, 1680, this.list_view.getBounds().height);
  		    // this.list_view.scrollprop = this.context.lobby_scrollbar.scrollable(this, this.list_view, 1680, 850);
        }
        else {
          this.list_view.scrollprop.scrollbar.y = this.list_view.scrollprop.top;
        }

      }
		},
		makeThumbnailTables(data, parent, child) {
			this.all_thumbnial_table = _.clone(this.context.lobby_liveGames.all_thumbnial_table);
			all(this, data).makeThumbnailTables();

			for(var x = 0; x < data.length; x++) {
				if(data[x].gameName == "Baccarat") {
					let miscData = (data[x].slave && data[x].slave == 'supersix')?data[x]:{};
					listBaccarat(this,data[x],x).drawBigRoad(formatData.fnFormatBCBigRoad(data[x].marks,6,24,miscData),"thumbnail");
        		}
			}
		}
	});

	return instance;
}
