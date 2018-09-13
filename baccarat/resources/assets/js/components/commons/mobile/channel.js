let instance = null;

export default() => {

	instance = instance || new blu.Component({
		main() {
			if (window.innerWidth < window.innerHeight && window.matchMedia("(orientation: portrait)").matches) {
				$('.channel-wrap').addClass('-portrait');
				$('.channel-inner.-portrait').show();
				$('.channel-inner.-landscape').hide();
			} else {
				$('.channel-wrap').removeClass('-portrait');
				$('.channel-inner.-portrait').hide();
				$('.channel-inner.-landscape').show();
			}

			$("#exit").on("click", ()=>{
        window.location = window.lobby_domain;
      });

      $('.ico-channel--info ').on("click", ()=>{
      	if(this.context.junketAgent) {
      		if($("#junket-info").hasClass('-portrait')) {
      			$("#junket-info.-portrait").addClass('active');
      			
      			$("#junket-info.-portrait").show();
      			$(".junket-player-con").show();
      			$(".junket-body-info.-junket-room").show();
      			$(".junket-body-info.-junket-buttons").show();
      			
      		}
      	} else {
        	$('.modal--betlimit').show();
      	}
      });

		},
		pinToggle() {
			// this.pinned = !this.pinned;
			// $('#interactive_pin').toggleClass('active', this.pinned);
		},
		setRound(round_id) {
			$('.channel--roundnum').text(round_id);
		},
		numberWithCommas (x) {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		},
		screenOrientation() {
			if (window.innerWidth < window.innerHeight && window.matchMedia("(orientation: portrait)").matches) {
				$('.channel-wrap').addClass('-portrait');
				$('.channel-inner.-portrait').show();
				$('.channel-inner.-landscape').hide();
			} else {
				$('.channel-wrap').removeClass('-portrait');
				$('.channel-inner.-portrait').hide();
				$('.channel-inner.-landscape').show();
			}
		}

	});

	return instance;
}
