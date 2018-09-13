<div id="balance-info" 
class=@if($junket == 1)"balancebet-con dom-resizable -user -{{App::getLocale()}}"
@else "balancebet-con dom-resizable -admin -{{App::getLocale()}}"
@endif>{{--balancebet-con--}}
	<div class="header">
		<span>{{trans('ingame-web.nihtanjunket_ingame_balancebet')}}</span>
		<span id="balance"></span>
	</div>
	<div class="balance-body-info">
		<div class="player-info player-banker-info">
			<span>{{trans('ingame-web.baccarat_betlayout_player')}}</span>
			<div class="bar-con">
				<div class="player-bar">
					<div class="bar-percent -player"></div>
				</div>
				<div class="total-info">
					<span id="player-total-bet">0</span>
					<span id="player-limit">0</span>
				</div>
			</div>
			<span id="player-user-cnt">0</span>
		</div>

		<div class="banker-info player-banker-info">
			<span>{{trans('ingame-web.baccarat_betlayout_banker')}}</span>
			<div class="bar-con">
				<div class="banker-bar">
					<div class="bar-percent -banker"></div>
				</div>
				<div class="total-info">
					<span id="banker-total-bet">0</span>
					<span id="banker-limit">0</span>
				</div>
			</div>
			<span id="banker-user-cnt">0</span>
		</div>

		<div class="balance-total-info">
			<div class="label">
				<span>{{trans('ingame-web.com_sub_menuarea_total')}}</span>
			</div>
			<div class="bet-info" id="total-bet">
				<span id="all-total-bet">0</span>
			</div>
			<div class="bet-info -text-right" id="">
				<span id="all-total-limit">0</span>
			</div>
		</div>
	</div>
</div>{{-- // balancebet-con--}}