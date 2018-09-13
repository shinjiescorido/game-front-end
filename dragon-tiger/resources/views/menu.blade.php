{{-- Menu --}}
<div id="menu-container" class="noselect dom-resizable selected-lang-{{ App::getLocale() }}"> {{--menu-container--}}
	<div class="menu-con"> {{--menu-con--}}
		<div class="menu-list">
			<div id="menu-video" class="menu-list-bg" value='video'>
				<div class="menu-list-inner">
		      <span class="list-video-ico"></span>
		    </div>
				<div class="menu-tooltip tooltip-video">
		      <span>{!! trans('ingame-web.com_sub_menuarea_videosettings') !!}</span>
		    </div>
			</div>
			<div id="menu-fullscreen" class="menu-list-bg" value='fullscreen'>
				<div class="menu-list-inner">
		      <span class="list-fullscreen-ico" fullscreen='false'></span>
		    </div>

		    <div class="menu-tooltip tooltip-fullscreen">
		      <span>{!! trans('ingame-web.com_sub_menuarea_fullscreen') !!}</span>
		    </div>
			</div>

			@if($isClassic)
				<div id="menu-multibet" class="menu-list-bg" value='multibet'>
					<div class="menu-list-inner">
			      <span class="list-multibet-ico"></span>
			    </div>
					<div class="menu-tooltip tooltip-multibet">
			      <span>{!! trans('ingame-web.com_sub_menuarea_multibet') !!}</span>
			    </div>
				</div>
			@endif

			@if($junket && !$isClassic)
				<div id="menu-chat" class="menu-list-bg" value='chat'>
					<div class="menu-list-inner -chat">
						<i class="chat-notif-count" value=0></i>
						<span class="list-chat-ico -inactive"></span>
			    </div>
					<div class="menu-tooltip tooltip-chat">
			      <span>{!! trans('ingame-web.com_sub_menuarea_chat') !!}</span>
			    </div>
				</div>
			@endif

			<div id="menu-userinfo" class="menu-list-bg" value='userinfo'>
				<div class="menu-list-inner">
		      <span class="list-userinfo-ico"></span>
		    </div>
				<div class="menu-tooltip tooltip-user">
		      <span>{!! trans('ingame-web.com_sub_menuarea_userinfo') !!}</span>
		    </div>
			</div>

			<div id="menu-howtoplay" class="menu-list-bg" value='howtoplay'>
				<div class="menu-list-inner">
		      <span class="list-howto-ico"></span>
		    </div>
				<div class="menu-tooltip tooltip-howtoplay">
		      <span>{!! trans('ingame-web.com_sub_menuarea_howtoplay') !!}</span>
		    </div>
			</div>

			@if($junket != 2)
				<div id="menu-betlogs" class="menu-list-bg" value='betlogs'>
					<div class="menu-list-inner">
			      <span class="list-betlogs-ico"></span>
			    </div>
					<div class="menu-tooltip tooltip-betlogs">
			      <span>{!! trans('ingame-web.com_sub_menuarea_betlogs') !!}</span>
			    </div>
				</div>
			@endif

			<div id="menu-settings" class="menu-list-bg" value='settings'>
				<div class="menu-list-inner">
		      <span class="list-settings-ico"></span>
		    </div>
				<div class="menu-tooltip tooltip-settings">
		      <span>{!! trans('ingame-web.com_sub_menuarea_settings') !!}</span>
		    </div>
			</div>
		</div>

		<div class="menu-sub-con">
			<div id="menuVidRefresh" class="menu-list-sub -list_sub"><span class="list-sub-refresh-ico -list_sub"></span></div>
			<div id="menuChangeQuality" class="menu-list-sub -list_sub"><p id="vidQualityText" class="-list_sub">{!! trans('ingame-web.com_sub_settings_hd') !!}</p></div>
		</div>
	</div> {{-- // menu-con--}}

	{{-- Menu Settings --}}
	<div class="modal-con noselect modal-con--settings"> {{--modal-con--}}
		<div class="modal-header modal-header-settings">
			<span class="menu-header-txt">{!! trans('ingame-web.com_sub_menuarea_settings') !!}</span>
			<span class="menu-close-ico" value='settings'></span>
		</div>
		<div class="modal-body modal-body-settings --settings">
			<div class="modal-holder -sound"> {{--modal-holder--}}
				<h3>{!! trans('ingame-web.com_sub_settings_sound') !!}</h3>
				<div class="modal-holder__items"> {{--modal-holder__items--}}
					<span class="settings-lbl">{!! trans('ingame-web.com_sub_settings_dealersvoice') !!}</span>
				</div> {{--// modal-holder__items--}}
				<div class="modal-holder__items"> {{--modal-holder__items--}}
					<span class="settings-lbl">{!! trans('ingame-web.com_sub_settings_gamesound') !!}</span>
				</div> {{--// modal-holder__items--}}
				<div class="modal-holder__items"> {{--modal-holder__items--}}
					<span class="settings-lbl">{!! trans('ingame-web.com_sub_settings_music') !!}</span>
				</div> {{--// modal-holder__items--}}
				<div class="modal-holder__items"> {{--modal-holder__items--}}
					<div class="music-dropdown-con">
						<span class="music-active"></span>
					</div>
				</div> {{--// modal-holder__items--}}

				<div class="music-list-con">
					<div class="music-list__items items_music-1" value='1'><span>{!! trans('ingame-web.com_sub_settings_music') !!} 1</span></div>
					<div class="music-list__items items_music-2" value='2'><span>{!! trans('ingame-web.com_sub_settings_music') !!} 2</span></div>
					<div class="music-list__items items_music-3" value='3'><span>{!! trans('ingame-web.com_sub_settings_music') !!} 3</span></div>
					<div class="music-list__items items_music-4" value='4'><span>{!! trans('ingame-web.com_sub_settings_music') !!} 4</span></div>
					<div class="music-list__items items_music-5" value='5'><span>{!! trans('ingame-web.com_sub_settings_music') !!} 5</span></div>
				</div>

				<div id="dealerMuteIco" class="settings-ico settings-mute-ico"></div>
				<div class="settings-volume-bg">
					<div id="dealerSndSlider" class="settings-vol-slider"></div>
				</div>
				<div id="dealerSndCircle" class="settings-volume-circle"></div>
				<div id="dealerMaxIco" class="settings-ico settings-max-ico"></div>

				<div id="gameMuteIco" class="settings-ico settings-mute-ico game-sound-min"></div>
				<div class="settings-volume-bg game-sound game-sound-vol-bg">
					<div id="gameSndSlider" class="settings-vol-slider"></div>
				</div>
				<div id="gameSndCircle" class="settings-volume-circle game-sound-circle"></div>
				<div id="gameMaxIco" class="settings-ico settings-max-ico game-sound-max"></div>

				<div id="musicMuteIco" class="settings-ico settings-mute-ico music-sound-min"></div>
				<div class="settings-volume-bg game-sound music-sound-vol-bg">
					<div id="musicSndSlider" class="settings-vol-slider"></div>
				</div>
				<div id="musicSndCircle" class="settings-volume-circle music-sound-circle"></div>
				<div id="musicMaxIco" class="settings-ico settings-max-ico music-sound-max"></div>
			</div> {{-- // modal-holder--}}

			<div class="modal-holder -theme"> {{--modal-holder--}}
				<h3>{!! trans('ingame-web.com_sub_settings_display') !!}</h3>
				<div class="modal-holder__items">
					<span class="settings-lbl">{!! trans('ingame-web.com_sub_settings_darktheme') !!}</span>
					<div id="setTheme" class="settings-switch-bg">
						<div id="setThemeCircle" class="settings-switch-circle"></div>
					</div>
				</div>
				<div class="modal-holder__items">
					<span class="settings-lbl">{!! trans('ingame-web.com_sub_settings_showtutorial') !!}</span>
					<div id="setTut" class="settings-switch-bg switch-tutorial">
						<div id="setTutCircle" class="settings-switch-circle"></div>
					</div>
				</div>
				<div class="modal-holder__items sub-language">
					<span class="settings-lbl">{!! trans('ingame-web.com_sub_settings_language') !!}</span>
					<div class="settings-language-con">
						<div class="settings-circle-highlight flag-con flag-english" value="0"><span class="settings-flag flag-en"></span></div>
						<div class="settings-circle-highlight flag-con flag-japan" value="1"><span class="settings-flag flag-jp"></span></div>
						<div class="settings-circle-highlight flag-con flag-korea" value="2"><span class="settings-flag flag-kr"></span></div>
						<div class="settings-circle-highlight flag-con flag-chinese" value="3"><span class="settings-flag flag-zh"></span></div>
						<div class="settings-circle-highlight flag-con flag-thai" value="4"><span class="settings-flag flag-th"></span></div>
					</div>
				</div>
			</div> {{-- // modal-holder--}}

			<div class="modal-holder -avatar"> {{--modal-holder--}}
				<h3>{!! trans('ingame-web.com_sub_settings_avatar') !!}</h3>
				<div class="settings-avatar-con">
					<div class="settings-circle-highlight avatar-con -red_king" value="0" avatar="red_king">
						<div class="settings-avatar-bg"><span class="settings-avatar avatar-king-red"></span></div>
					</div>
					<div class="settings-circle-highlight avatar-con -red_queen" value="1" avatar="red_queen">
						<div class="settings-avatar-bg"><span class="settings-avatar avatar-queen-red"></span></div>
					</div>
					<div class="settings-circle-highlight avatar-con -red_jack" value="2" avatar="red_jack">
						<div class="settings-avatar-bg"><span class="settings-avatar avatar-jack-red"></span></div>
					</div>
					<div class="settings-circle-highlight avatar-con -red_joker" value="3" avatar="red_joker">
						<div class="settings-avatar-bg"><span class="settings-avatar avatar-joker-red"></span></div>
					</div>
					<div class="settings-circle-highlight avatar-con -black_king" value="4" avatar="black_king">
						<div class="settings-avatar-bg"><span class="settings-avatar avatar-king-black"></span></div>
					</div>
					<div class="settings-circle-highlight avatar-con -black_queen" value="5" avatar="black_queen">
						<div class="settings-avatar-bg"><span class="settings-avatar avatar-queen-black"></span></div>
					</div>
					<div class="settings-circle-highlight avatar-con -black_jack" value="6" avatar="black_jack">
						<div class="settings-avatar-bg"><span class="settings-avatar avatar-jack-black"></span></div>
					</div>
					<div class="settings-circle-highlight avatar-con -black_joker" value="7" avatar="black_joker">
						<div class="settings-avatar-bg"><span class="settings-avatar avatar-joker-black"></span></div>
					</div>
				</div>
			</div> {{-- // modal-holder--}}
		</div>
	</div> {{-- // modal-con--}}

	{{-- Chat --}}
	<div class="modal-con noselect modal-con--chat">
		<div class="modal-header modal-header-chat">
			<span class="menu-header-txt">{!! trans('ingame-web.com_sub_menuarea_chat') !!}</span>
			<span class="menu-close-ico" value='chat'></span>
		</div>

		<div class="modal-body modal-body-chat --chat">
			<div class="chat-message-con message-con-{!! Auth::user()->id !!}">
				{{-- Messages here --}}
			</div>

			<div class="chat-input-con">
				<div class="chat-input -bc" contentEditable="true"></div>
				<div class="chat-actions">
					<div class="send-message-ico -bc"></div>
					<div class="emote-ico-btn -bc" toggled="false"></div>
				</div>
			</div>
		</div>

		<div class="chat-emote-con -bc">
			<div class="chat-inner">
				<div class="emote-ico -bc emote-smile" code=":smile:"></div>
				<div class="emote-ico -bc -bc emote-heart" code=":heart:"></div>
				<div class="emote-ico -bc emote-grin" code=":grin:"></div>
				<div class="emote-ico -bc emote-astonish" code=":astonish:"></div>
				<div class="emote-ico -bc emote-tongue" code=":tongue:"></div>
				<div class="emote-ico -bc emote-cry" code=":cry:"></div>
				<div class="chat-arrow-down"><span></span></div>
			</div>
		</div>
	</div> {{-- // modal-con--}}

	{{-- Menu Bet Logs --}}
	<div class="modal-con noselect modal-con--betlogs"> {{--modal-con--}}
		<div class="modal-betlogs-con -betlogslist"> {{--modal-betlogs-cons--}}
			<div class="modal-header modal-header-betlogs">
				<span class="menu-header-txt --betlogs">{!! trans('ingame-web.com_sub_menuarea_betlogs') !!}</span>
				<span class="menu-close-ico" value='betlogs'></span>
			</div>

			<div class="modal-body modal-body-nodata --betlogs"><span>{!! trans('ingame-web.other_prompts_mobile_nodata') !!}</span></div>

			<div class="modal-body modal-body-betlogs --betlogs">
				<div id="tblBetLogs" class="modal-tbl">
					@if($junket == 2)
						<div class="modal-tbl-header">
							<div class="tbl-header-list -list_gameno">{!! trans('ingame-web.com_sub_menuarea_gameno') !!}</div>
							<div class="tbl-header-list -list_date">{!! trans('ingame-web.com_sub_menuarea_date') !!}</div>
							<div class="tbl-header-list -list_channel">{!! trans('ingame-web.com_sub_menuarea_channel') !!}</div>
							<div class="tbl-header-list -list_dealer">{!! trans('ingame-web.com_sub_menuarea_dealername') !!}</div>
							<div class="tbl-header-list -list_currency">Currency</div>
							<div class="tbl-header-list -list_totalbet">{!! trans('ingame-web.com_sub_menuarea_totalbet') !!}</div>
							<div class="tbl-header-list -list_winlose">{!! trans('ingame-web.com_sub_menuarea_winlose') !!}</div>
						</div>
					@else
						<div class="modal-tbl-header">
							<div class="tbl-header-list -list_gameno">{!! trans('ingame-web.com_sub_menuarea_gameno') !!}</div>
							<div class="tbl-header-list -list_date">{!! trans('ingame-web.com_sub_menuarea_date') !!}</div>
							<div class="tbl-header-list -list_channel">{!! trans('ingame-web.com_sub_menuarea_channel') !!}</div>
							<div class="tbl-header-list -list_dealer">{!! trans('ingame-web.com_sub_menuarea_dealername') !!}</div>
							<div class="tbl-header-list -list_totalbet">{!! trans('ingame-web.com_sub_menuarea_totalbet') !!}</div>
							<div class="tbl-header-list -list_winlose">{!! trans('ingame-web.com_sub_menuarea_winlose') !!}</div>
						</div>
					@endif

					<div id="tblBodyBetlogs" class="modal-tbl-body"></div>
					<div class="modal-tbl-footer center-content">
						<div id="prevPageBetlogs" class="page-ico prev-page-ico"></div>
						<div id="tblFooterBetlogs"></div>
						<div id="nextPageBetlogs" class="page-ico next-page-ico"></div>
					</div>
				</div>
			</div>
		</div> {{-- // modal-betlogs-cons--}}
		<div id="modalResult" class="modal-betlogs-con -betlogsresult"> {{--modal-betlogs--}}
			{{-- Bet Logs Result --}}
			<div class="modal-con -result noselect ">
				<div class="modal-header modal-header-result">
					<span class="menu-header-txt">{!! trans('ingame-web.com_sub_menuarea_betlogs') !!}</span>
					<span class="menu-close-ico" value='result'></span>
				</div>

				<div class="modal-body modal-body-result">
					<div class="result-header">
						<div class="result-header-list header-list-left"></div>
						<div class="result-header-list header-list-center">
							<div class="header-result-con center-content"></div>
						</div>
						<div class="result-header-list header-list-right"></div>
					</div>
					<div class="result-body">
						<div class="result-main-con center-content"></div>
					</div>
					<div class="result-table">
						<div class="result-table-head">
							<div class="result-tr">
								<div class="result-th bet-type">{!! trans('ingame-web.com_sub_menuarea_bettype') !!}</div>
								<div class="result-th bets">{!! trans('ingame-web.com_sub_menuarea_bets') !!}</div>
								<div class="result-th win-lose">{!! trans('ingame-web.com_sub_menuarea_winlose') !!}</div>
							</div>
						</div>
						<div class="result-table-body">
						</div>
					</div>
				</div>
			</div>
		</div> {{-- // modal-betlogs--}}
	</div> {{-- // modal-con--}}

	{{-- Menu How to Play --}}
	<div id="top" class="modal-con modal-con--howtoplay"> {{--modal-con--}}
		<div class="modal-header modal-header-howtoplay">
			<span class="menu-header-txt">{!! trans('ingame-web.com_sub_menuarea_howtoplay') !!}</span>
			<span class="menu-close-ico" value='howtoplay'></span>
		</div>

		<div class="modal-body modal-body-howtoplay --howtoplay">
			{{-- <div class="howto-wrap--accent"></div> --}}

			<div class="game-rules-con">
				<ul class="gamerules-menu"> {{-- .gamerules-menu --}}
					<li class="gamerules-menu__items">
						<a href="#game"></a>
						<span>{!! trans('howto.game_objective') !!}</span>
					</li>
					<li class="gamerules-menu__items">
						<a href="#gameplay"></a>
						<span>{!! trans('howto.gameplay') !!}</span>
					</li>
					<li class="gamerules-menu__items">
						<a href="#type-of-bets"></a>
						<span>{!! trans('howto.types_of_bet') !!}</span>
					</li>
				</ul> {{-- // .gamerules-menu --}}
			</div>

			<div id="top" class="howto-wrap howto_content howto-wrap--pc">
				<div class="howto-wrap__items clearfix"> {{-- .howto-wrap__items --}}
					<div id="game" class="howto--layers"> {{-- .game-objective --}}
						{!! trans('howto.gameobj_desc') !!}
					</div> {{-- // .game-objective --}}

					<div id="gameplay" class="howto--layers"> {{-- .gameplay --}}
						<h4>{!! trans('howto.gameplay') !!}</h4>

						<ul class="gameplay-list">
							{!! trans('howto.gameplay_list') !!}
						</ul>
					</div> {{-- // .gameplay --}}
					<div  class="howto--layers"> {{-- .type-of-bets --}}
						<h4 id="type-of-bets">{!! trans('howto.types_of_bet') !!}</h4>
						<table class="tbl--typeofbets">
							<thead>
								<tr>
									<th class="bet">{!! trans('howto.bet') !!}</th>
									<th class="payout">{!! trans('howto.payout') !!}</th>
									<th class="condition">{!! trans('howto.condition_of_winning') !!}</th>
								</tr>
							</thead>

							<tbody>
								<tr>
									<td class="bet">{!! trans('howto.bet_dragon') !!}</td>
									<td class="payout">{!! trans('howto.payout_1_1') !!}</td>
									<td class="condition">{!! trans('howto.condition_1') !!}</td>
								</tr>

								<tr>
									<td class="bet">{!! trans('howto.bet_tiger') !!}</td>
									<td class="payout">{!! trans('howto.payout_1_1') !!}</td>
									<td class="condition">{!! trans('howto.condition_2') !!}</td>
								</tr>

								<tr>
									<td class="bet">{!! trans('howto.bet_tie') !!}</td>
									<td class="payout">{!! trans('howto.payout_10_1') !!}</td>
									<td class="condition">{!! trans('howto.condition_3') !!}</td>
								</tr>

								<tr>
									<td class="bet">{!! trans('howto.bet_suitedtie') !!}</td>
									<td class="payout">{!! trans('howto.payout_50_1') !!}</td>
									<td class="condition">{!! trans('howto.condition_6') !!}</td>
								</tr>

								<tr>
									<td class="bet">{!! trans('howto.bet_bigsmall') !!}</td>
									<td class="payout">{!! trans('howto.payout_1_1') !!}</td>
									<td class="condition">{!! trans('howto.condition_4') !!}</td>
								</tr>

								<tr>
									<td class="bet">{!! trans('howto.bet_oddeven') !!}</td>
									<td class="payout">{!! trans('howto.payout_1_1') !!}</td>
									<td class="condition">{!! trans('howto.condition_5') !!}</td>
								</tr>

								<tr>
									<td class="bet">{!! trans('howto.bet_suit') !!}</td>
									<td class="payout">{!! trans('howto.payout_3_1') !!}</td>
									<td class="condition">{!! trans('howto.condition_7') !!}</td>
								</tr>
							</tbody>
						</table>
					</div> {{--  //.type-of-bets --}}

					<div id="suit" class="howto--layers clearfix"> {{-- #suit --}}
						<!-- <h4 id="type-of-bets">{!! trans('howto.suit_suited') !!}</h4> -->
						<div class="suit__items -suit">
							<h4>{!! trans('howto.suit_title') !!}</h4>
							<p>{!! trans('howto.suit_desc') !!}</p>
						</div>

						<div class="suit__items -suited-tie">
							<h4>{!! trans('howto.suitedtie_title') !!}</h4>
							<p>{!! trans('howto.suitedtie_desc') !!}</p>
						</div>
					</div> {{-- // #suit --}}

					<div class="howto--layers clearfix"> {{-- #suit --}}
						<div class="suit__items -suit">
							<img src="/img/howtoplay/dt_suit1_pc.png" alt="suit" />
						</div>
						<div class="suit__items -suited-tie">
							<img src="/img/howtoplay/dt_suit2_pc.png" alt="suited tie" />
						</div>
					</div>
				</div> {{-- // .howto-wrap__items --}}

			</div>
			{{-- <a href="#gamerules"><div class="arrow-up dom-resizable"></div></a> --}}
		</div>
	</div> {{-- // modal-con--}}
</div> {{--// menu-container--}}
