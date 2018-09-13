import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas } from '../factories/factories';
import {instance as all} from './factory/all.js';
import {instance as userbased} from './factory/userbased.js';
import rmformat from '../factories/formatter';

let formatData = rmformat();

let component_userbased = {
	stage_list : [],
	main (data, gamedata) {
		  this.createStage(data);

			let self = this;

			$('.header-subnav__sortlist li').click(function(){
				$('.header-subnav__sort span').text($(this).text());
				$('.header-subnav__sort span').attr('data-value', $(this).attr('data-value')).removeClass('active');
						let currentOpen = toggle.getCurrentOpen();
						let rooms = self.context.instance.roomTables;
						let gameTables = self.context.instance.sicboTables[0];
						let type = 'Sicbo';

						if(currentOpen.toLowerCase() === "userbased_paigow") {
							type = 'Paigow';
							rooms = self.context.instance.paigow_roomTables;
							gameTables = self.context.instance.paigowTables[1];
						} 
						self.createTables(rooms, gameTables, type, $(this).attr('data-value'));
			});
	},
	createTables(data, gamedata, type, sort = "all") {
    if(!data) return;
		if(!data.length) {
			for(var x = 0; x < this.stage_list.length; x++) {
				this.stage_list[x].removeAllChildren();
			}
			return
		};

		all.room_tables = [];
		let sortedData = []
    switch(sort){
      case 'all':
        sortedData = _.filter(data, (e) => { return e.data[2] == window.vendor_id; });
        break;
      case 'privaterooms':
        sortedData = _.filter(data, (e) => { return e.data[2] == window.vendor_id && e.banker.password });
        break;
      case 'publicrooms':
        sortedData = _.filter(data, (e) => { return e.data[2] == window.vendor_id && !e.banker.password});
        break;
    }
    this.createStage(sortedData, type);

    console.log("sorted data", sortedData)

		for(var x = 0; x < sortedData.length; x++) {
			this.stage_list[x].room_tables = [];
			this.stage_list[x].data = sortedData[x];
			all.makeRoomListTables(sortedData[x], gamedata, this.stage_list[x], null, x, this);
			userbased.makeRoomListTables(sortedData[x], gamedata, this.stage_list[x], null, x, this);
		}

		$('#privatejoin').on('click', (e)=> {
			let roompass = $('#joinpass').val();
			let token = $('#privatejoin').attr('token');
			let betrange = $('#privatejoin').attr('betrange');
			let tableid = $('#privatejoin').attr('tableid');
			let roomId = $('#privatejoin').attr('roomId');
			let pass = $('#targetuser').val();
			let game = $('#privatejoin').attr('game');

			$.post(`/checkPass`, {
				password: roompass,
				roomPassword: pass,
				roomId: roomId,
				game
			}, (response) => {
					if(response == 'true') {

				      if(game.toLowerCase() === "pai-gow") {
								location.assign(window.paigow_domain+tableid+"/"+betrange+"/0?token="+token)
				      } else {
								location.assign(window.sb_domain+tableid+"/"+betrange+"?token="+token)
				      }

							$('#joinpass').val('');
              $('.error-text').hide();
					} else {
						$('.error-text').show();
					}
			});
		})
	},

	createStage(data, type) {
		let pos = 0;
    let cntr = -1;

		$(".ub-tables").empty();
		for(var x = 0; x < data.length;x++) {
			var c = document.createElement("canvas");
			var t = document.createElement("canvas");

			if(type == 'Sicbo') {
				c.setAttribute("id", "sb-room"+x)
				c.setAttribute("width", "815px");
				c.setAttribute("height", "122px");
			}

			if(type == 'Paigow') {
				c.setAttribute("id", "pg-room"+x)
				c.setAttribute("width", "815px");
				c.setAttribute("height", "122px");
			}



			$(".ub-tables").append(c);

			if(pos%2 == 0) {
				pos = 0;
				cntr++;
			}

			$(c).css({
				position : 'absolute',
        left : (pos* 830)+15+'px',
        top : (cntr* 145)+'px',
				transform : 'translate(0,0)'
			});
			pos ++;

			if(type == 'Sicbo') {
				this.stage_list[x] = new createjs.Stage("sb-room"+x);
				this.stage_list[x].enableMouseOver(10)
				this.stage_list[x].x = 15;
				this.stage_list[x].y = 5;
			}
			if(type == 'Paigow') {
				this.stage_list[x] = new createjs.Stage("pg-room"+x);
				this.stage_list[x].x = 15;
				this.stage_list[x].y = 5;
			}

	  } // end for
	},

	setResultIsPublic(data, roomdata) {
    userbased.setResultIsPublic(data, roomdata)
  }, //setResultIsPublic

	setUserCount (data, roomdata) {
    userbased.setUserCount(data, roomdata)
  }, //setUserCount

  setUserLeave (data, roomdata) {
    userbased.setUserLeave(data, roomdata)
  }, //setUserCount


}

export default {
	component_userbased
}
