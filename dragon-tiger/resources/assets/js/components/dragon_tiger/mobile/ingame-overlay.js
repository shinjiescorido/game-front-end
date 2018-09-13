

export default () => {
	return new blu.Component({
        bg: 'rgba(0,0,0,0.6)',

		main() {

            let stage_width = this.context.stage.baseWidth;
            let stage_height = this.context.stage.baseHeight;

            this.findbyName = ['dealer', 'winning', 'playerinfo'];
            this.overlay = [
                { width: 405, height : 120, x : 0, y : 0 },//dealer
                { width: 200, height : 110 , x : 0, y : 130 },//winning
                { width: stage_width, height : 12 , x : 0, y : stage_height - 162 },//playerinfo
            ];

            this.steps = [];

            for(let k = 0; k < this.overlay.length; k++)
            {
                this.steps[k] = new createjs.Container();

                let prop = this.overlay[k];
                    //overlay with dark background
                    let ol = new createjs.Shape();
                    ol.graphics.f(this.bg).drawRect(0,0, prop.width, prop.height);
                    ol.x = prop.x;
                    ol.y = prop.y;


                    this.steps[k].addChild(ol);
                    this.steps[k].visible = false;

                this.addChild(this.steps[k]);
            
            }//end of loop
            
        },
        showOverlay (name)
        {
            let show_index = this.findbyName.indexOf(name);
            if(show_index >= 0)
            {
                this.steps[show_index].visible = true;
            }
        },

        hideOverlay (name)
        {
            let show_index = this.findbyName.indexOf(name);
            if(show_index >= 0)
            {
                this.steps[show_index].visible = false;
            }
        }
    })


}