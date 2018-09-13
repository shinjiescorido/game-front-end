export default () => {
    return new blu.Component({
        main() {

            this.bg = new createjs.Shape();
            this.bg.graphics.f('rgba(0,0,0,0.7)').moveTo(0,0).drawRect(0,0,355.2, this.context.stage.baseHeight - (180))
            .moveTo(this.context.stage.baseWidth - (355.4) ,0).drawRect(this.context.stage.baseWidth - (355.4) ,0,355, this.context.stage.baseHeight - (180))
            .moveTo(355,849.6).drawRect(355,849.6, 1210, 50.4);
            this.bg.x = 0;
            this.bg.y = 0;
            this.bg.visible = false;
            this.addChild(this.bg);
            if(window.tutorial_enabled) {
                this.initTutorial();
            }
            
            $('#neverShow').click((e) => {
                $.post("/settings", {tutorial : false}, (response) => {});
                this.finishTutorial();
                this.context.component_menuSettingsEvents.setSwitchToggle($('#setTut'))
            });
            
            $('#startGame').click((e) => {
                this.finishTutorial();    
            });
            
        },

        initTutorial() {
            this.bg.visible = true;
            if(window.junket && !_.isEmpty(window.vendorData)) {
                this.bg.graphics.clear().f('rgba(0,0,0,0.7)')
                .moveTo(355,849.6).drawRect(410,849.6, 1510, 50.4);
                return;
            }
            $('#menu-multibet').addClass('multibet-active');
            let self = this;
            setTimeout(function() {
                self.context.component_toggle.toggleMultibet();
                $('.game-range-sel:eq(2) .game-list').show();
                $('.game-range-sel:eq(3) .range-list').show();
            }, 0);
        },

        finishTutorial() {
            this.bg.visible = false;
            window.tutorial_enabled = false;
            $('.tutorial-wrap').hide();
            $('#menu-multibet').removeClass('multibet-active');
            this.context.component_toggle.toggleMultibet();
            this.context.component_multibetv2.resetData();
            this.context.component_gameButtons.checkButtonState();
            $('.game-range-sel:eq(2) .game-list').hide();
            $('.game-range-sel:eq(3) .range-list').hide();
        }
     
    })


}