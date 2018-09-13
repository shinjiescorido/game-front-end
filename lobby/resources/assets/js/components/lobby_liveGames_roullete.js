let instance = null;

export default() => {
	instance = instance || new blu.Component({
		all_table : [],
		baccarat_tables: [],
		poker_tables : [],
		sicbo_tables: [],
		dragonTigerTables: [],
		main() {
			
			this.y = 72;

			let bg = new createjs.Shape();
			bg.graphics.beginFill("#4d4d4d").drawRect(0,0,this.context.context.width - this.context.body_bg_width,1050);
			this.addChild(bg);
			
			this.visible = false;

			let poker_tables = [
				{
					"table_num" : 1,
					"table_name" : "Baccarat" 
				}
			] //data tables

			this.sicbo_tables_container = new createjs.Container();
			this.sicbo_tables_container.x = 16;
			this.sicbo_tables_container.y = 250;
			this.addChild(this.sicbo_tables_container);

			this.makeSicboTables(poker_tables);

		},
		makeSicboTables (data) {
			for(var x = 0; x < data.length; x++) {
				this.sicbo_tables[x] = new createjs.Shape();
				this.sicbo_tables[x].graphics.beginFill("blue").drawRoundRectComplex(0,0,1640,300,10,10,0,0);
				this.sicbo_tables_container.addChild(this.sicbo_tables[x]);
			}
		}
	});

	return instance;
}