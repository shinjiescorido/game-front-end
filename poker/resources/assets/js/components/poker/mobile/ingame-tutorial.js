
export default () => {
	return new blu.Component({
        bg: 'rgba(0,0,0,0.6)',

		main() {

            let stage_width = this.context.stage.baseWidth;
            let stage_height = this.context.stage.baseHeight;

            this.findbyName = ['dealer', 'winning','bonuspayout', 'roadmap', 'playerinfo', 'menu', 'chips','gamebuttons','timer','ante','flop','turn','river','cardresult'];
            this.overlay = [
                { width: 405, height : 120, x : 0, y : 0, radius : [0 , 0, 10, 0] },//dealer
                { width: 220, height : 110 , x : 0, y : 130, radius : [0, 10, 10, 0 ] },//bet_details
                { width: 220, height : 185 , x : 0, y : 250, radius : [0, 10, 10, 0 ] },//bonuspayout
                { width: 595, height : 150 , x : 0, y : stage_height - 150 },//roadmap
                { width: 230, height : 150 , x : 610, y : stage_height - 150 },//playerinfo
                { width: 210, height : 85 , x : stage_width - 210, y : 0 },//menu
                { width: 210, height : 473, x : stage_width - 210, y : 85 },//chips
                { width: 450, height : 150 , x : 840, y : stage_height - 150 },//gamebuttons
                { width: 0, height : 0 , x : 0, y : 0 },//timer
                { width: 0, height : 0 , x : 0, y : 0 },//ante
                { width: 0, height : 0 , x : 0, y : 0 },//flop
                { width: 0, height : 0 , x : 0, y : 0 },//turn
                { width: 0, height : 0 , x : 0, y : 0 },//river
                { width: 615, height : 150 , x : 0, y : stage_height - 150 },//cardresult
            ];

            //changing themes
            let revert_theme = window.theme == "black" ? "white" : "black";
            this.change_theme_callbacks = [
                () => { this.context.component_dealer.changeTheme(revert_theme) },
                () => { this.context.component_betDetails.changeTheme(revert_theme) },
                () => { this.context.component_payoutInfo.changeTheme(revert_theme) },
                () => { this.context.component_roadmap.changeTheme(revert_theme) },
                () => { this.context.component_playerInfo.changeTheme(revert_theme) },
                () => { this.context.component_menu.changeTheme(revert_theme) },
                () => { this.context.component_gameInfo.changeTheme(revert_theme) },
                () => { return; },
                () => { this.context.component_gameButtons.changeTheme(revert_theme) },
            ]

            let self = this;
            this.steps = [];

            this.allOverlay = new createjs.Shape();
            this.allOverlay.graphics.f(this.bg).drawRect(0,0, stage_width, stage_height);
            this.addChild(this.allOverlay);

            this.stepContainer = new createjs.Container();
            this.stepContainer.visible = false;
            this.addChild(this.stepContainer);

            this.overlayVideo = new createjs.Shape();
            this.overlayVideo.graphics.f(this.bg).moveTo(405, 0).drawRect(405, 0, stage_width - 615, stage_height - 162)
            .f(this.bg).moveTo(0, 120).drawRect(0, 120, 405, 10)
            .f(this.bg).moveTo(220, 130).drawRect(220, 130, 185, 428)
            .f(this.bg).moveTo(0, 240).drawRect(0, 240, 220, 10)
            .f(this.bg).moveTo(0, 435).drawRect(0, 435, 220, 123)
            //{ width: 200, height : 110 , x : 0, y : 130, radius : [0, 10, 10, 0 ] },//winning
            this.stepContainer.addChild(this.overlayVideo);

            for(let k = 0; k < this.overlay.length; k++)
            {
                this.steps[k] = new createjs.Container();

                let glow = new createjs.Shape();

                let unglow = ['menu', 'chips', 'gamebuttons'];

                //fix gap overlay between roadmap and playerinfo
                let gapFix = new createjs.Shape();
                gapFix.graphics.f(this.bg).drawRect(0,0, 15, 150);
                gapFix.x = 595;
                gapFix.y = stage_height - 150;
                this.steps[k].addChild(gapFix);

                _.each(this.overlay, (prop, i) => {


                    if(k == i && unglow.indexOf(this.findbyName[i]) < 0){
                        // glow effect
                        glow = this.glow(prop, i);
                        this.steps[k].addChild(glow);
                        return;
                    }

                    // remove overlay on card display
                    if(
                        (k == this.findbyName.indexOf("cardresult") && i == this.findbyName.indexOf("roadmap")) ||
                        (i == this.findbyName.indexOf("cardresult"))
                    ) return;

                    //overlay with dark background
                    let ol = new createjs.Shape();
                    ol.graphics.f(this.bg).drawRect(0,0, prop.width, prop.height);
                    ol.x = prop.x;
                    ol.y = prop.y;
                    this.steps[k].addChild(ol);

                }); // end each loop


                if(k != this.findbyName.indexOf('playerinfo'))
                {
                //overlay user profile pic
                let overlay_pp = new createjs.Shape();
                overlay_pp.graphics.f(this.bg).drawRect(0,0, stage_width, 12);
                overlay_pp.x = 0;
                overlay_pp.y = stage_height - 162;
                this.steps[k].addChild(overlay_pp);
                }

                this.steps[k].addChild(glow);

                this.steps[k].visible = false;
                this.stepContainer.addChild(this.steps[k]);

            }//end for loop

            //get user avatar
            let player_index = this.findbyName.indexOf('playerinfo');
            this.steps[player_index].addChild(this.context.component_playerInfo.cloneUserAvatar());
            this.steps[player_index].visible = false;

            //clone menu
            let menu_index = this.findbyName.indexOf('menu');
            this.steps[menu_index].addChild(this.context.component_menu.cloneMenu(revert_theme));
            this.steps[menu_index].visible = false;

            //clone chips
            let chips_index = this.findbyName.indexOf('chips');
            this.steps[chips_index].addChild(this.context.component_chips.cloneChips());
            this.steps[chips_index].visible = false;

            //clone gamebuttons
            let button_index = this.findbyName.indexOf('gamebuttons');
            this.steps[button_index].addChild(this.context.component_gameButtons.cloneButtons());
            this.steps[button_index].visible = false;

            //clone timer
            let timer_index = this.findbyName.indexOf('timer');
            this.steps[timer_index].timer = this.context.component_timer.cloneTimer();
            this.steps[timer_index].addChild(this.context.component_gameButtons.cloneButtons(true), this.steps[timer_index].timer);
            this.steps[timer_index].visible = false;
            this.stepContainer.addChild(this.steps[timer_index]);

            //clone ante & bonus
            let ante_index = this.findbyName.indexOf('ante');
            this.steps[ante_index].addChild(this.context.component_tableDraw.cloneAnte());
            this.steps[ante_index].visible = false;
            this.stepContainer.addChild(this.steps[ante_index]);

            //clone flop
            let flop_index = this.findbyName.indexOf('flop');
            this.steps[flop_index].addChild(this.context.component_tableDraw.cloneFlop());
            this.steps[flop_index].visible = false;
            this.stepContainer.addChild(this.steps[flop_index]);

            //clone turn
            let turn_index = this.findbyName.indexOf('turn');
            this.steps[turn_index].addChild(this.context.component_tableDraw.cloneTurn());
            this.steps[turn_index].visible = false;
            this.stepContainer.addChild(this.steps[turn_index]);

            //clone river
            let river_index = this.findbyName.indexOf('river');
            this.steps[river_index].addChild(this.context.component_tableDraw.cloneRiver());
            this.steps[river_index].visible = false;
            this.stepContainer.addChild(this.steps[river_index]);

            // //clone tabledraw
            // let table_index = this.findbyName.indexOf('tabledraw');
            // this.steps[table_index].addChild(this.context.component_secondView.cloneTableDraw());
            // this.steps[table_index].visible = false;

            //prevent click

            this.addEventListener('click', (e) =>{
                e.stopPropagation();

                    return;
            });

            this.currentStep = 0;
            this.steps[0].visible = true;
            this.visible = false;
            this.initTutorial();

        },//main

        changeTheme(new_theme){
            this.context.component_gameInfo.changeTheme(new_theme)
            this.context.component_dealer.changeTheme(new_theme)
            this.context.component_betDetails.changeTheme(new_theme)
            this.context.component_payoutInfo.changeTheme(new_theme)
            this.context.component_roadmap.changeTheme(new_theme)
            this.context.component_playerInfo.changeTheme(new_theme)
            this.context.component_menu.changeTheme(new_theme)
            this.context.component_gameButtons.changeTheme(new_theme)
        },

        initTutorial()
        {
            if(!window.tutorial_enabled) return;
            $(".tutorials").show();
            this.visible = true;
            this.allOverlay.visible = true;

            let self = this;

            $(".tutorials").show();
            $('.tutorials .btn-continue').on('click', (e) =>{
                e.preventDefault();
                self.allOverlay.visible = false;
                self.stepContainer.visible = true;
                self.change_theme_callbacks[0]();
                self.context.component_ingameOverlay.showOverlay(self.findbyName[self.currentStep]);
            });

            $('.tutorials .btn-cancel, .tutorials .btn-close, .tutorials .btn-nevershow').on('click', (e) =>{
                e.preventDefault();
                if(self.currentStep < self.change_theme_callbacks.length)
                {
                    for(let i = self.change_theme_callbacks.length - 1; i >= self.currentStep; i--)
                    {
                        self.change_theme_callbacks[i]();
                    }
                }
                if($(e.target).hasClass('btn-nevershow'))
                {
                    self.disableTutorial();
                }
                self.finishTutorial();
            });

            $('.tutorials .btn-next').on('click', (e) => {
                e.preventDefault();
                self.nextStep();
            });

            $('.btn-startGame').on('click', (e) => {
                e.preventDefault();
                self.disableTutorial();
                self.finishTutorial();
            });

        },
        disableTutorial(){
            this.context.component_settings.disableTutorial();
            $.post("/settings", {tutorial : false}, (response) => {

            });
        },
        finishTutorial()
        {
            this.visible = false;
            window.tutorial_enabled = false;
            window.theme = window.theme == "black" ? "white" : "black";
            this.context.component_ingameOverlay.visible = false;
            this.context.component_fake_cardResult.visible = false;
        },

        glow(prop, index)
        {

            let glow = new createjs.Container();


            if(!prop.width && !prop.height) return glow;

            let glowShape = new createjs.Shape();

            glowShape.graphics.f('rgba(0,0,0,0.01)').drawRect(0, 0, prop.width, prop.height)
            glowShape.graphics.lf(['rgba(241, 227, 130, 0.6)','rgba(160, 152, 92, 0.05)'], [0, 0.4], 0, 0, -30, -30).moveTo(- 30, -30).drawRoundRectComplex(-30,-30, 30, 30, 30 ,0 ,0 ,0)
            glowShape.graphics.lf(['rgba(241, 227, 130, 0.6)','rgba(160, 152, 92, 0.05)'], [0, 0.8], 0, 0, 0, -30).moveTo(0, -30).drawRect(0,-30, prop.width, 30)
            glowShape.graphics.lf(['rgba(241, 227, 130, 0.6)','rgba(160, 152, 92, 0.05)'], [0, 0.4], prop.width, 0, prop.width + 30, - 30).moveTo(prop.width, -30).drawRoundRectComplex(prop.width,-30, 30, 30, 0 ,30 ,0 ,0)
            glowShape.graphics.lf(['rgba(241, 227, 130, 0.6)','rgba(160, 152, 92, 0.05)'], [0, 0.8], prop.width, 0, prop.width + 30, 0).moveTo(prop.width, 0).drawRect(prop.width, 0, 30,prop.height)
            glowShape.graphics.lf(['rgba(241, 227, 130, 0.6)','rgba(160, 152, 92, 0.05)'], [0, 0.4], prop.width, prop.height, prop.width + 30, prop.height + 30).moveTo(prop.width, prop.height).drawRoundRectComplex(prop.width,prop.height, 30, 30, 0 ,0, 30 ,0)
            glowShape.graphics.lf(['rgba(241, 227, 130, 0.6)','rgba(160, 152, 92, 0.05)'], [0, 0.8], 0, prop.height, 0, prop.height + 30).moveTo(0, prop.height).drawRect(0, prop.height, prop.width, 30)
            glowShape.graphics.lf(['rgba(241, 227, 130, 0.6)','rgba(160, 152, 92, 0.05)'], [0, 0.4], 0, prop.height, -30, prop.height + 30).moveTo(-30, prop.height).drawRoundRectComplex(-30,prop.height, 30, 30, 0 ,0 ,0 ,30)
            glowShape.graphics.lf(['rgba(241, 227, 130, 0.6)','rgba(160, 152, 92, 0.05)'], [0, 0.8], 0, 0, -30, 0).moveTo(-30, 0).drawRect(-30,0, 30, prop.height);

            if(prop.radius)
            {   // for rounded corners
                //-- left top
                glowShape.graphics.rf(['rgba(241, 227, 130, 0.6)','rgba(160, 152, 92, 0.05)'], [0, 0.8], prop.radius[0] * 0.5, prop.radius[0] * 0.5,0, 0, 0, 30)
                .moveTo(0, 0).lineTo(prop.radius[0], 0).curveTo(prop.radius[0] * 0.2, prop.radius[0] * 0.2, 0, prop.radius[0]).closePath();
                glowShape.graphics.rf(['rgba(241, 227, 130, 0.6)','rgba(160, 152, 92, 0.05)'], [0, 0.8], prop.width - prop.radius[1] * 0.5, prop.radius[1] * 0.5,0, prop.width, 0, 30)
                .moveTo(prop.width - prop.radius[1], 0).curveTo(prop.width - prop.radius[1] * 0.2, prop.radius[1] * 0.2, prop.width, prop.radius[1]).lineTo(prop.width, 0).closePath();
                glowShape.graphics.rf(['rgba(241, 227, 130, 0.6)','rgba(160, 152, 92, 0.05)'], [0, 0.8], prop.width - prop.radius[2] * 0.5, prop.height - prop.radius[2] * 0.5,0, prop.width, prop.height, 30)
                .moveTo(prop.width, prop.height - prop.radius[2]).curveTo(prop.width - prop.radius[2] * 0.2, prop.height - prop.radius[2] * 0.2, prop.width - prop.radius[2], prop.height).lineTo(prop.width, prop.height).closePath();
                glowShape.graphics.rf(['rgba(241, 227, 130, 0.6)','rgba(160, 152, 92, 0.05)'], [0, 0.8], prop.radius[3] * 0.5, prop.height - prop.radius[3] * 0.5,0, 0, prop.height, 30)
                .moveTo(0, prop.height - prop.radius[3]).curveTo(prop.radius[3] * 0.2, prop.height - prop.radius[3] * 0.2, prop.radius[3], prop.height).lineTo(0,prop.height).closePath();
            }

            glow.addChild(glowShape);
            glow.x = prop.x;
            glow.y = prop.y;


            return glow;
        },

        prevStep () {

            if(this.currentStep > 0)
            {
                this.currentStep--;

                if(this.steps[this.currentStep + 1])
                {
                    this.resetStep(this.currentStep + 1);
                    this.context.component_ingameOverlay.hideOverlay(this.findbyName[this.currentStep + 1]);
                    if(this.change_theme_callbacks[this.currentStep]) this.change_theme_callbacks[this.currentStep]();
                }

                this.steps[this.currentStep].visible = true;
                this.context.component_ingameOverlay.showOverlay(this.findbyName[this.currentStep]);
            }
        },

        nextStep() {

            if(this.currentStep < this.steps.length - 1)
            {
                this.currentStep++;

                if(this.steps[this.currentStep - 1])
                {
                    this.resetStep(this.currentStep - 1);
                    this.context.component_ingameOverlay.hideOverlay(this.findbyName[this.currentStep - 1]);
                }

                this.steps[this.currentStep].visible = true;
                this.context.component_ingameOverlay.showOverlay(this.findbyName[this.currentStep]);
                if(this.change_theme_callbacks[this.currentStep]) this.change_theme_callbacks[this.currentStep]();

                if(this.currentStep == this.findbyName.indexOf('timer'))
                {
                    this.steps[this.currentStep].timer.startTimer(30);
                }
                if(this.currentStep == this.findbyName.indexOf('ante'))
                {
                    this.context.component_fake_cardResult.play();
                }
                if(this.currentStep == this.findbyName.indexOf('flop'))
                {
                    this.context.component_fake_cardResult.playFlop();
                }
                if(this.currentStep == this.findbyName.indexOf('turn'))
                {
                    this.context.component_fake_cardResult.playTurn();
                }
                if(this.currentStep == this.findbyName.indexOf('river'))
                {
                    this.context.component_fake_cardResult.playRiver();
                }
                if(this.currentStep == this.findbyName.indexOf('cardresult'))
                {
                    this.context.component_fake_cardResult.finishPlay();
                }
            }

        },

        resetStep(index)
        {
            this.steps[index].visible = false;
        }
    })


}
