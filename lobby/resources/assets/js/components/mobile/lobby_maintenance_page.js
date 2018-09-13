// import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas} from '../factories/factories';

let instance = null;

export default() => {
	instance = instance || new blu.Component({
		main() {
			
			this.x = 0;
			this.y = 0;
			this.visible = false;

			this.width = this.context.stage.baseWidth;
			this.height = this.context.stage.baseHeight;

			this.maintenanceCon = new createjs.Container();
			this.addChild(this.maintenanceCon);

			//CLick event to prevent click behind maintenance page
			this.addEventListener('click', (e) => {
	          	return;
	        });
		},

		maintenanceEnd() {
			this.maintenanceCon.removeAllChildren();
			this.visible = false;
		},

		maintenanceStart(data) {

			this.context.context.context.lobby_header.visible = false;
			this.context.context.context.lobby_liveGames_subHeader.visible = false;
			this.context.context.context.lobby_themedGames_subHeader.visible = false;
			
			let maintenanceBg = new createjs.Shape();
			maintenanceBg.graphics.beginFill("#cc2011").drawRect(0,0,this.width,this.height);
			this.maintenanceCon.addChild(maintenanceBg);

			let patternLeft = new createjs.Bitmap(this.context.getResources("maintenance_lpattern"));
			patternLeft.x = 0;
			patternLeft.y = 0;
			this.maintenanceCon.addChild(patternLeft);

			let patternRight = new createjs.Bitmap(this.context.getResources("maintenance_rpattern"));
			patternRight.x = this.width - 463;
			patternRight.y = this.height - 461;
			this.maintenanceCon.addChild(patternRight);

			let nihtanLogo = new createjs.Bitmap(this.context.getResources("maintenance_nihtan"));
			nihtanLogo.x = (this.width / 2) - 265;
			nihtanLogo.y = 150;
			this.maintenanceCon.addChild(nihtanLogo);

			let maintenanceLogo = new createjs.Bitmap(this.context.getResources("maintenance_ico"));
			maintenanceLogo.x = (this.width / 2) - 70;
			maintenanceLogo.y = 500;
			this.maintenanceCon.addChild(maintenanceLogo);

			this.maintenanceMessage = new createjs.Text(data.mainText,"60px Arial","#ffb94a");
			this.maintenanceMessage.x = this.width / 2;
			this.maintenanceMessage.y = 670;
			this.maintenanceMessage.textAlign = "center";
			this.maintenanceCon.addChild(this.maintenanceMessage);

			this.maintenanceSubMessage = new createjs.Text(data.subText,"40px Lato","#fff");
			this.maintenanceSubMessage.x = this.width / 2;
			this.maintenanceSubMessage.y = 750;
			this.maintenanceSubMessage.textAlign = "center";
			this.maintenanceCon.addChild(this.maintenanceSubMessage);
			
			this.maintenanceDuration = new createjs.Text(data.start_time+' ~ '+data.end_time,"40px Lato","#fff");
			this.maintenanceDuration.x = this.width / 2;
			this.maintenanceDuration.y = 800;
			this.maintenanceDuration.textAlign = "center";
			this.maintenanceCon.addChild(this.maintenanceDuration);

			this.visible = true;
		}
	});

	return instance;
}
