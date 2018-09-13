import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas } from '../factories/factories';
import listSicbo from './factory/l_sicbo';
import listDt from './factory/l_dragonTiger';
import listBaccarat from './factory/l_baccarat';
import listPoker from './factory/l_poker';
import all from './factory/l_all';
import rmformat from '../factories/formatter';

let instance = null;
let formatData = rmformat();

export default() => {
	instance = instance || new blu.Component({
		all_thumbnial_table : [],
		all_list_table : [],
		main() {

			this.y = 0;

			// let bg = new createjs.Shape();
			// bg.graphics.beginFill("#4d4d4d").drawRect(0,0,this.context.context.width - this.context.body_bg_width,1060);
			// this.addChild(bg);

			let bg_mask = new createjs.Shape();
			bg_mask.graphics.beginFill("red").drawRect(0,0,this.context.context.width - this.context.body_bg_width,1050-200);

			this.visible = false;

			let parent = new createjs.Container();
			parent.x = 16;
			// parent.y = 250;
			parent.mask = bg_mask;
			this.addChild(parent);

			this.list_view = new createjs.Container();
			this.list_view.x = 16;
			// this.list_view.y = 250;
			// this.list_view.mask = bg_mask;
			this.list_view.visible = false;
			this.addChild(this.list_view);




			this.thumbnail_view = new createjs.Container();
			this.thumbnail_view.x = 16;
			// this.thumbnail_view.y = 250;
			// this.thumbnail_view.mask = bg_mask;
			this.addChild(this.thumbnail_view);


		},
		setMaintenance (data, x) {
			switch (data.eventName)  {
				case "maintenanceChange" :
					all(this, data, x).checkMaintenance(data.data.status, true, x);

					if (data.gameName == 'Baccarat') {
						listBaccarat(this,data,x).checkMaintenance(data.data.status, true);
					}

					if (data.gameName == 'Dragon-Tiger') {
						listDt(this,data,x).checkMaintenance(data.data.status, true);
					}

					if (data.gameName == 'Poker') {
						listPoker(this,data,x).checkMaintenance(data.data.status, true);
						//listPoker(this,data,x).checkMaintenance(data.data.status, true);
					}

					if (data.gameName == 'Sicbo') {
						listSicbo(this,data,x).checkMaintenance(data.data.status, true);
					}
					break;
			}
		},
		setResult(data, gameName, tId, meta) {
			for(var x = 0; x < data.length; x++) {
				if(gameName != data[x].gameName || tId != data[x].tableNumber) {
					continue;
				}
				switch (gameName)  {
					case "Sicbo" :
						listSicbo(this,data[x],x).setResult(data[x])
						listSicbo(this,data[x],x).doubleTripleCount(data[x].marks)
						listSicbo(this,data[x],x).setHotColdResult(data[x].marks)
						listSicbo(this,data[x],x).drawRoadMap(formatData.fnFormatSicbo(data[x].marks,17,6),"list")
						listSicbo(this,data[x],x).drawRoadMap(formatData.fnFormatSicbo(data[x].marks,24,6),"thumbnail")
						listSicbo(this,data[x],x).setPercentages(data[x].marks);
						break;
					case "Baccarat" :
						let miscData = (data[x].slave && data[x].slave == 'supersix')?data[x]:{};
						listBaccarat(this,data[x],x).setPercentages(data[x].marks);
						listBaccarat(this,data[x],x).setResult(data[x].marks);
						listBaccarat(this,data[x],x).drawPearlRoad(formatData.fnFormatBCPearlRoad(data[x].marks,6,13,miscData),"list");
						listBaccarat(this,data[x],x).drawBigRoad(formatData.fnFormatBCBigRoad(data[x].marks,6,24,miscData),"thumbnail");
						listBaccarat(this,data[x],x).drawBigRoad(formatData.fnFormatBCBigRoad(data[x].marks,6,30,miscData),"list");
						listBaccarat(this,data[x],x).drawBigEyeBoy(formatData.fnFormatBigEyeBoy(data[x].marks,6,28),"list");
						listBaccarat(this,data[x],x).drawSmallRoad(formatData.fnFormatSmallRoad(data[x].marks,6,28),"list");
						listBaccarat(this,data[x],x).drawCockradRoad(formatData.fnFormatCockroachPig(data[x].marks,6,28),"list");
						break;
					case "Dragon-Tiger" :
						listDt(this,data[x],x).setResult(data[x]);
						listDt(this,data[x],x).setPercentages(data[x].marks);
						listDt(this,data[x],x).drawBigRoad(formatData.fnFormatDTBigRoad(data[x].marks,6,30),"list");
						listDt(this,data[x],x).drawPearlRoad(formatData.fnFormatDTPearlRoad(data[x].marks,6,14),"list");
						listDt(this,data[x],x).drawBigEyeBoy(formatData.fnFormatDTBigEyeBoy(data[x].marks),"list");
						listDt(this,data[x],x).drawBigRoad(formatData.fnFormatDTBigRoad(data[x].marks,6,24),"thumbnail");
						listDt(this,data[x],x).drawSmallRoad(formatData.fnFormatDTSmallRoad(data[x].marks,6,12),"list");
						listDt(this,data[x],x).drawCockroachRoad(formatData.fnFormatDTCockroachPig(data[x].marks,6,12),"list");
						break;
					case "Poker" :
						listPoker(this,data[x],x).drawRoadMap(formatData.fnFormatPokerRoadMap(data[x].marks,6,24), "list");
						listPoker(this,data[x],x).drawRoadMap(formatData.fnFormatPokerRoadMap(data[x].marks,6,24), "thumbnail");
						listPoker(this,data[x],x).drawTableData(meta);
						break;
				}

			}
		},
		inputResult (data,card_data) {

			for(var x = 0; x < data.length; x++) {
				if((card_data.tableId == data[x].tableNumber) && (card_data.gameName == data[x].gameName)) {

					if(data[x].gameName == "Baccarat") {
						listBaccarat(this,data[x],x).inputRes(card_data);
					}
					else if(data[x].gameName == "dragontiger" || data[x].gameName == "Dragon-Tiger") {
						listDt(this,data[x],x).inputRes(card_data);
					} //end if
					else if(data[x].gameName == "Poker") {
						listPoker(this,data[x],x).inputRes(card_data, "thumbnail");
						listPoker(this,data[x],x).inputRes(card_data, "list");
					} //end if
				}
			}
		},
		makeListTables (data, parent, child) {
      		// parent.y = 250;
      		if(!data) return;

			all(parent.parent, data).makeListTables();

			for(var x = 0; x < data.length; x++) {

				if(data[x].gameName == "Baccarat") {
					let miscData = (data[x].slave && data[x].slave == 'supersix')?data[x]:{};
					listBaccarat(parent.parent,data[x],x).createTable();
					listBaccarat(parent.parent,data[x],x).drawBigRoad(formatData.fnFormatBCBigRoad(data[x].marks,6,30,miscData),"list");
					listBaccarat(parent.parent,data[x],x).drawPearlRoad(formatData.fnFormatBCPearlRoad(data[x].marks,6,14,miscData),"list");
					listBaccarat(parent.parent,data[x],x).drawBigEyeBoy(formatData.fnFormatBigEyeBoy(data[x].marks),"list");
					listBaccarat(parent.parent,data[x],x).drawSmallRoad(formatData.fnFormatSmallRoad(data[x].marks,6,24),"list");
					listBaccarat(parent.parent,data[x],x).drawCockradRoad(formatData.fnFormatCockroachPig(data[x].marks,6,24),"list");

				} else if(data[x].gameName == "Dragon-Tiger" || data[x].gameName == "dragontiger") {
					listDt(parent.parent,data[x],x).createTable();
					listDt(parent.parent,data[x],x).drawBigRoad(formatData.fnFormatDTBigRoad(data[x].marks,6,30),"list");
					listDt(parent.parent,data[x],x).drawPearlRoad(formatData.fnFormatDTPearlRoad(data[x].marks,6,12),"list");
					listDt(parent.parent,data[x],x).drawBigEyeBoy(formatData.fnFormatDTBigEyeBoy(data[x].marks,6,12),"list");
					listDt(parent.parent,data[x],x).drawSmallRoad(formatData.fnFormatDTSmallRoad(data[x].marks,6,12),"list");
					listDt(parent.parent,data[x],x).drawCockroachRoad(formatData.fnFormatDTCockroachPig(data[x].marks,6,12),"list");

				} else if(data[x].gameName == "Sicbo") {
					listSicbo(parent.parent,data[x],x).createTable();
        		} else if(data[x].gameName == "Poker") {
					listPoker(parent.parent,data[x],x).createTable();
					listPoker(parent.parent,data[x],x).drawRoadMap(formatData.fnFormatPokerRoadMap(data[x].marks,6,24),"list");
					listPoker(parent.parent,data[x],x).drawTableData(data[x].meta);
        		}

			}

      // if(this.list_view.children.length > 0) {
      //   if(!this.list_view.scrollprop) {
      //     this.list_view.setBounds(0, 0, 1680, this.list_view.getBounds().height);
  		  //   this.list_view.scrollprop = this.context.lobby_scrollbar.scrollable(this, this.list_view, 1680, 860);
      //   }
      //   else {
      //     this.list_view.scrollprop.scrollbar.y = this.list_view.scrollprop.top;
      //   }

      // }



		},
		makeThumbnailTables(data, parent, child) {
      // parent.y = 250;

			all(parent.parent, data).makeThumbnailTables();

			for(var x = 0; x < data.length; x++) {
				if(data[x].gameName == "Sicbo") {
					listSicbo(parent.parent,data[x],x).drawRoadMap(formatData.fnFormatSicbo(data[x].marks,24,6),"thumbnail");
        		}
				else if(data[x].gameName == "Baccarat") {
					let miscData = (data[x].slave && data[x].slave == 'supersix')?data[x]:{};
						listBaccarat(this,data[x],x).drawBigRoad(formatData.fnFormatBCBigRoad(data[x].marks,6,24,miscData),"thumbnail");
				}
				else if(data[x].gameName == "Dragon-Tiger") {
					listDt(this,data[x],x).drawBigRoad(formatData.fnFormatDTBigRoad(data[x].marks,6,24),"thumbnail");
				}
				else if(data[x].gameName == "Poker") {
					listPoker(parent.parent,data[x],x).thumbnailCreate();
					listPoker(parent.parent,data[x],x).drawRoadMap(formatData.fnFormatPokerRoadMap(data[x].marks,6,24),"thumbnail");
				}
			}

      // if(this.thumbnail_view.children.length > 0) {
      //   if(!this.thumbnail_view.scrollprop) {
      //     this.thumbnail_view.setBounds(0, 0, 1680, this.thumbnail_view.getBounds().height+20);
  		  //   this.thumbnail_view.scrollprop = this.context.lobby_scrollbar.scrollable(this, this.thumbnail_view, 1680, 860);
      //   }
      //   else {
      //     this.thumbnail_view.scrollprop.scrollbar.y = this.thumbnail_view.scrollprop.top;
      //   }

      // }
		}

	});

	return instance;
}
