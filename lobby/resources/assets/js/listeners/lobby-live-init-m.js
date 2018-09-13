import Xpacket from '../lib/XPacket';


export default(self) => {
	self.hot_live_games = [];

	self.socket.on('connect', function (e) {
	});

	 self.socket.on("data", (data)=>{
		let data_res = Xpacket.received(data)
		switch(data_res.eventName) {
			case ("init") :
				init(data_res);
				break;
		}

	});

	let init = (data) => {
		window.dealerImg = [];
		window.all_tables = data.data;

		let supersixTable = null;
		let bonusplusTable = null;
		let slaveTables = [];
		window.all_tables = _.filter(window.all_tables, function (e) { // === filtering data
            if (e.gameName === 'Roulette') return;
            
			if (e.dealerId !== undefined) {
				self.dealer_id.push(e.dealerId)
			}

			if(e.gameName == 'Poker' && e.slave && e.slave){
				if(e.slave == 'bonusplus'){
					bonusplusTable = Object.assign({}, e);
					e.slave=null;
				}
			}


			if(e.gameName == 'Baccarat' && e.slave && e.slave){
				if(Array.isArray(e.slave)){
					
					_.each(e.slave,s=>{
						if(s=='bonus'){
							let objBonus = Object.assign({}, e);
							objBonus.slave = 'bonus';
							slaveTables.push(objBonus);
							e.slave=null;
						}
						if(s=='supersix'){
							let objSS = Object.assign({}, e);
					
							objSS.slave = 'supersix';
							slaveTables.push(objSS);
							e.slave=null;
						}
					});
				}
				if(e.slave == 'supersix'){
					let obj = Object.assign({}, e);
					obj.slave = 'supersix';
					slaveTables.push(obj);
					e.slave=null;
				}
			}

			if(e.gameName != "Big-Wheel" && e.gameName != "Pula-Puti") {
				return e;
			}

			if(e.gameName == "Sicbo") {
				e.marks = _.filter (_.filter(e.marks,(m) => {
					if('game_info' in m) return m;    
				}), (mark) => {
					if(mark.game_info) return mark
				});
			}
		});

			if(bonusplusTable) window.all_tables.push(bonusplusTable);
		if(slaveTables.length){
			_.each(slaveTables,t=>{
				window.all_tables.push(t);
			});
		} //window.all_tables.push(supersixTable);


		// For blob dealer image
		$.post(`/getDealerImg`, {dealerId : self.dealer_id},  (response) => {
			window.dealerImg = response;

			if (self.lobby_liveGames.all_list_table.length) {
				for (var i = 0; i < self.lobby_liveGames.all_list_table.length; i++) {
					for (var j = 0; j < window.dealerImg.length; j++) {
						if (self.lobby_liveGames.all_list_table[i].dealer_id == window.dealerImg[j].id) {
							let dbImage = new Image();
							dbImage.src = window.dealerImg[j].dealer_image;
							self.lobby_liveGames.all_list_table[i].dealer_img.image = dbImage;
						}
					}
				}
			}
		});

		all_tables = _.sortBy(all_tables, ['gameName', byKey('tableNumber')]);

		if(self.is_loaded) {
			self.initTable(data);
		}
		self.data_flag = true;
	}
}
function byKey(key) {
	return function (o) {
		var v = parseInt(o[key], 10);
		return isNaN(v) ? o[key] : v;
	};
}