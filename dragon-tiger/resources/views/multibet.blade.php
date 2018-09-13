<div id="multibet">
	<div class="game-range-sel game-range-sel-1 dom-resizable">
		<div class="unavailable-stat active"><span>{{trans('ingame-web.nihtanjunket_lobby_unavailabletable')}}</span></div>
		<div class="multi-game-name {{App::getLocale()}}">
			<span></span>
			<i class='drop-down'></i>
		</div>
		<div class="game-list">
		</div>
		<div class="multi-range">
			<span></span>
			<i class='drop-down'></i>
		</div>
		<div class="range-list">
		</div>
		<div class="link-go">
			<span></span>
		</div>
	</div>
	{{--win notif--}}
	<div class="multibet-win-notif multibet-win-notif-1 dom-resizable">
		<div class="win-wrap">
			<span class="win-close-icon"> </span>
			@if(App::getLocale() === 'zh')
				<div class="you-win-text">{{trans('ingame.youwin')}}</div>
			@else
				<div class="you-win-text">You Win!</div>
			@endif
			<div class="win-amt">0</div>
		</div>
	</div>

	<div class="game-range-sel game-range-sel-2 dom-resizable">
		<div class="unavailable-stat active"><span>{{trans('ingame-web.nihtanjunket_lobby_unavailabletable')}}</span></div>
		<div class="multi-game-name {{App::getLocale()}}">
			<span></span>
			<i class='drop-down'></i>
		</div>
		<div class="game-list">
		</div>
		<div class="multi-range">
			<span></span>
			<i class='drop-down'></i>
		</div>
		<div class="range-list">
		</div>
		<div class="link-go">
			<span></span>
		</div>
	</div>
	{{--win notif--}}
	<div class="multibet-win-notif multibet-win-notif-2 dom-resizable">
		<div class="win-wrap">
			<span class="win-close-icon"> </span>
			@if(App::getLocale() === 'zh')
				<div class="you-win-text">{{trans('ingame.youwin')}}</div>
			@else
				<div class="you-win-text">You Win!</div>
			@endif
			<div class="win-amt">0</div>
		</div>
	</div>

	<div class="game-range-sel game-range-sel-3 dom-resizable">
		<div class="unavailable-stat active"><span>{{trans('ingame-web.nihtanjunket_lobby_unavailabletable')}}</span></div>
		<div class="multi-game-name {{App::getLocale()}}">
			<span></span>
			<i class='drop-down'></i>
		</div>
		<div class="game-list">
		</div>
		<div class="multi-range">
			<span></span>
			<i class='drop-down'></i>
		</div>
		<div class="range-list">
		</div>
		<div class="link-go">
			<span></span>
		</div>
	</div>
	{{--win notif--}}
	<div class="multibet-win-notif multibet-win-notif-3 dom-resizable">
		<div class="win-wrap">
			<span class="win-close-icon"> </span>
			@if(App::getLocale() === 'zh')
				<div class="you-win-text">{{trans('ingame.youwin')}}</div>
			@else
				<div class="you-win-text">You Win!</div>
			@endif
			<div class="win-amt">0</div>
		</div>
	</div>

	<div class="game-range-sel game-range-sel-4 dom-resizable">
		<div class="unavailable-stat active"><span>{{trans('ingame-web.nihtanjunket_lobby_unavailabletable')}}</span></div>
		<div class="multi-game-name {{App::getLocale()}}">
			<span></span>
			<i class='drop-down'></i>
		</div>
		<div class="game-list">
		</div>
		<div class="multi-range">
			<span></span>
			<i class='drop-down'></i>
		</div>
		<div class="range-list">
		</div>
		<div class="link-go">
			<span></span>
		</div>
	</div>
	{{--win notif--}}
	<div class="multibet-win-notif multibet-win-notif-4 dom-resizable">
		<div class="win-wrap">
			<span class="win-close-icon"> </span>
			@if(App::getLocale() === 'zh')
				<div class="you-win-text">{{trans('ingame.youwin')}}</div>
			@else
				<div class="you-win-text">You Win!</div>
			@endif
			<div class="win-amt">0</div>
		</div>
	</div>

	<div id='roadmap-container' class="dom-resizable">
		<button id='link'></button>
		<canvas id="rm" width="648" height="205"></canvas>
	</div>
</div>

	<div id="table-redirect-list" class="dom-resizable">
		<button class="button-list"></button>
		<div class="all-table-list">
		</div>
	</div>
	<div id='roadmap-list-container' class="dom-resizable">
		<canvas id="rm-list" width="505" height="145"></canvas>
	</div>