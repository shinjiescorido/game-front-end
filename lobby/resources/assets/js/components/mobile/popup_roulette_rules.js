let instance = null;

export default() => {
	instance = instance || new blu.Component({
		ads : [],
		circle_indicator : [],
		main() {
      this.context.removeChild(this);

      //content
      this.x = 40;
      this.y = 230;


		},

    init() {
      let content = this.writeContent();
    },

    writeContent() {
      let con = new createjs.Container();
      con.x = 620;
      this.addChild(con);
      let comingsoon = new createjs.Text("Coming soon...", "bold 24px Lato", "#4d4d4d");
      con.addChild(comingsoon);


      return con;


    } // end of writeContent

	});

	return instance;
}
