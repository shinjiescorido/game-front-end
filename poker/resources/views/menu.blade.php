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
			
			{{-- <div id="menu-chat" class="menu-list-bg" value='chat'><span class="list-chat-ico">SOON</span></div> --}}
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
			<div id="menu-betlogs" class="menu-list-bg" value='betlogs'>
				<div class="menu-list-inner">
		      <span class="list-betlogs-ico"></span>
		    </div>
				<div class="menu-tooltip tooltip-betlogs">
		      <span>{!! trans('ingame-web.com_sub_menuarea_betlogs') !!}</span>
		    </div>
			</div>
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
		</div>
	</div>

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
					<div class="modal-tbl-header">
						<div class="tbl-header-list -list_gameno">{!! trans('ingame-web.com_sub_menuarea_gameno') !!}</div>
						<div class="tbl-header-list -list_date">{!! trans('ingame-web.com_sub_menuarea_date') !!}</div>
						<div class="tbl-header-list -list_channel">{!! trans('ingame-web.com_sub_menuarea_channel') !!}</div>
						<div class="tbl-header-list -list_dealer">{!! trans('ingame-web.com_sub_menuarea_dealername') !!}</div>
						<div class="tbl-header-list -list_totalbet">{!! trans('ingame-web.com_sub_menuarea_totalbet') !!}</div>
						<div class="tbl-header-list -list_winlose">{!! trans('ingame-web.com_sub_menuarea_winlose') !!}</div>
					</div>

					<div id="tblBodyBetlogs" class="modal-tbl-body"></div>
					<div class="modal-tbl-footer center-content">
						<div id="prevPageBetlogs" class="page-ico prev-page-ico"></div>
						<div id="tblFooterBetlogs"></div>
						<div id="nextPageBetlogs" class="page-ico next-page-ico"></div>
					</div>
				</div>
			</div>
		</div>{{-- // modal-betlogs-cons--}}
		<div id="modalResult" class="modal-betlogs-con -betlogsresult"> {{-- modal-betlogs-cons--}}
			<div class="modal-con -result noselect ">
				<div class="modal-header modal-header-result">
					<span class="menu-header-txt">{!! trans('ingame-web.com_sub_menuarea_winningresult') !!}</span>
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
		</div>{{-- // modal-betlogs-cons--}}
	</div> {{-- // modal-con--}}

	{{-- Menu How to Play --}}
	<div id="top" class="modal-con modal-con--howtoplay">
		<div class="modal-header modal-header-howtoplay">
			<span class="menu-header-txt">{!! trans('ingame-web.com_sub_menuarea_howtoplay') !!}</span>
			<span class="menu-close-ico" value='howtoplay'></span>
		</div>

		<div class="modal-body modal-body-howtoplay --howtoplay">
			{{-- <div class="howto-wrap--accent"></div> --}}
			<div class="game-rules-con">
				<ul class="gamerules-menu"> {{-- .gamerules-menu --}}
					<li class="gamerules-menu__items">
						<a href="#game-objective"></a>
						<span>{!! trans('howto.game_objective') !!}</span>
					</li>
					<li class="gamerules-menu__items">
						<a href="#gameplay"></a>
						<span>{!! trans('howto.gameplay') !!}</span>
					</li>
					@if (trans('howto.card_rank') !== '')
						<li class="gamerules-menu__items">
							<a href="#card_rank"></a>
							<span>{!! trans('howto.card_rank') !!}</span>
						</li>
					@endif
					<li class="gamerules-menu__items">
						<a href="#poker-hand-rankings"></a>
						<span>{!! trans('howto.poker_hand_rankings') !!}</span>
					</li>
					<li class="gamerules-menu__items">
						<a href="#betting-system"></a>
						<span>{!! trans('howto.betting_system') !!}</span>
					</li>
					<li class="gamerules-menu__items">
						<a href="#ante_bet_payouts"></a>
						<span>{!! trans('howto.ante_bet_payouts') !!}</span>
					</li>
					<li class="gamerules-menu__items">
						<a href="#payouts"></a>
						<span>{!! trans('howto.payouts') !!}</span>
					</li>
					<!-- <li class="gamerules-menu__items">
						<a href="#bonus_bet_payouts"></a>
						<span>{!! trans('howto.bonus_bet_payouts') !!}</span>
					</li> -->
					<!-- <li class="gamerules-menu__items">
						<a href="#bonus_plus_payouts"></a>
						<span>{!! trans('howto.bonus_plus_payouts') !!}</span>
					</li> -->
					<!-- <li class="gamerules-menu__items">
						<a href="#pocket_bonus_payouts"></a>
						<span>{!! trans('howto.pocket_bonus_payouts') !!}</span>
					</li> -->
					<li class="gamerules-menu__items">
						<a href="#same-hand-ranking"></a>
						<span>{!! trans('howto.same_hand_ranking') !!}</span>
					</li>
				</ul> {{-- // .gamerules-menu --}}
			</div>

			<div id="top" class="howto-wrap howto_content howto-wrap--pc">
				<div class="howto-wrap__items"> {{--howto-wrap__items--}}
					<div id="game-objective" class="howto--layers"> {{--howto--layers--}}
						<h4>{!! trans('howto.game_objective') !!}</h4>
						<p>{!! trans('howto.game_objective_desc_pc') !!}</p>
					</div> {{-- // howto--layers--}}

					<div id="gameplay" class="howto--layers"> {{--howto--layers--}}
						<h4>{!! trans('howto.gameplay') !!}</h4>
						<ol class="gameplay--list">
							{!! trans('howto.gameplay_desc_pc') !!}
						</ol>
					</div> {{-- // howto--layers--}}

					@if (trans('howto.card_rank') !== '')
						<div id="card_rank" class="howto--layers"> {{--howto--layers--}}
							<h4>{!! trans('howto.card_rank') !!}</h4>
							<p>{!! trans('howto.card_rank_desc_pc') !!}</p>
						</div> {{-- // howto--layers--}}
					@endif

					<div id="poker-hand-rankings" class="howto--layers"> {{--howto--layers--}}
						<h4>{!! trans('howto.poker_hand_rankings') !!}</h4>
						<div class="pokerhand-wrap"> {{--pokerhand-wrap--}}
							<div class="pokerhand-con clearfix">
								<div class="pokerhand-con__items clearfix">
									<h5>1. {!! trans('howto.poker_hand_ranking_list_1') !!}</h5>
									<p>{!! trans('howto.poker_hand_ranking_list_1_desc_pc') !!}</p>
								</div>
								<div class="pokerhand-con__items clearfix">
									<img src="/img/howtoplay/pc/poker_handranking_1.png" alt="">
								</div>
							</div>
							<div class="pokerhand-con clearfix">
								<div class="pokerhand-con__items clearfix">
									<h5>2. {!! trans('howto.poker_hand_ranking_list_2') !!}</h5>
									<p>{!! trans('howto.poker_hand_ranking_list_2_desc_pc') !!}</p>
								</div>
							</div>
							<div class="pokerhand-con clearfix">
								<div class="pokerhand-con__items clearfix">
									<h5>a.) {!! trans('howto.poker_hand_ranking_list_3') !!}</h5>
									<p>{!! trans('howto.poker_hand_ranking_list_3_desc_pc') !!}</p>
								</div>
								<div class="pokerhand-con__items clearfix"><img src="/img/howtoplay/pc/poker_handranking_2.png" alt=""></div>
							</div>
							<div class="pokerhand-con clearfix">
								<div class="pokerhand-con__items clearfix">
									<h5>b.) {!! trans('howto.poker_hand_ranking_list_4') !!}</h5>
									<p>{!! trans('howto.poker_hand_ranking_list_4_desc_pc') !!}</p>
								</div>
								<div class="pokerhand-con__items clearfix"><img src="/img/howtoplay/pc/poker_handranking_2-1.png" alt=""></div>
							</div>
							<div class="pokerhand-con clearfix">
								<div class="pokerhand-con__items clearfix">
									<h5>3. {!! trans('howto.poker_hand_ranking_list_5') !!}</h5>
									<p>{!! trans('howto.poker_hand_ranking_list_5_desc_pc') !!}</p>
								</div>
								<div class="pokerhand-con__items clearfix"><img src="/img/howtoplay/pc/poker_handranking_3.png" alt=""></div>
							</div>
							<div class="pokerhand-con clearfix">
								<div class="pokerhand-con__items clearfix">
									<h5>4. {!! trans('howto.poker_hand_ranking_list_6') !!}</h5>
									<p>{!! trans('howto.poker_hand_ranking_list_6_desc_pc') !!}</p>
								</div>
								<div class="pokerhand-con__items clearfix"><img src="/img/howtoplay/pc/poker_handranking_4.png" alt=""></div>
							</div>
							<div class="pokerhand-con clearfix">
								<div class="pokerhand-con__items clearfix">
									<h5>5. {!! trans('howto.poker_hand_ranking_list_7') !!}</h5>
									<p>{!! trans('howto.poker_hand_ranking_list_7_desc_pc') !!}</p>
								</div>
								<div class="pokerhand-con__items clearfix"><img src="/img/howtoplay/pc/poker_handranking_5.png" alt=""></div>
							</div>
							<div class="pokerhand-con clearfix">
								<div class="pokerhand-con__items clearfix">
									<h5>6. {!! trans('howto.poker_hand_ranking_list_8') !!}</h5>
									<p>{!! trans('howto.poker_hand_ranking_list_8_desc_pc') !!}</p>
								</div>
							</div>
							<div class="pokerhand-con clearfix">
								<div class="pokerhand-con__items clearfix">
									<h5>a.) {!! trans('howto.poker_hand_ranking_list_9') !!}</h5>
									<p>{!! trans('howto.poker_hand_ranking_list_9_desc_pc') !!}</p>
								</div>
								<div class="pokerhand-con__items clearfix"><img src="/img/howtoplay/pc/poker_handranking_6.png" alt=""></div>
							</div>
							<div class="pokerhand-con clearfix">
								<div class="pokerhand-con__items clearfix">
									<h5>b.) {!! trans('howto.poker_hand_ranking_list_10') !!}</h5>
									<p>{!! trans('howto.poker_hand_ranking_list_10_desc_pc') !!}</p>
								</div>
								<div class="pokerhand-con__items clearfix"><img src="/img/howtoplay/pc/poker_handranking_6-1.png" alt=""></div>
							</div>
							<div class="pokerhand-con clearfix">
								<div class="pokerhand-con__items clearfix">
									<h5>7. {!! trans('howto.poker_hand_ranking_list_11') !!}</h5>
									<p>{!! trans('howto.poker_hand_ranking_list_11_desc_pc') !!}</p>
								</div>
								<div class="pokerhand-con__items clearfix"><img src="/img/howtoplay/pc/poker_handranking_7.png" alt=""></div>
							</div>
							<div class="pokerhand-con clearfix">
								<div class="pokerhand-con__items clearfix">
									<h5>8. {!! trans('howto.poker_hand_ranking_list_12') !!}</h5>
									<p>{!! trans('howto.poker_hand_ranking_list_12_desc_pc') !!}</p>
								</div>
								<div class="pokerhand-con__items clearfix"><img src="/img/howtoplay/pc/poker_handranking_8.png" alt=""></div>
							</div>
							<div class="pokerhand-con clearfix">
								<div class="pokerhand-con__items clearfix">
									<h5>9. {!! trans('howto.poker_hand_ranking_list_13') !!}</h5>
									<p>{!! trans('howto.poker_hand_ranking_list_13_desc_pc') !!}</p>
								</div>
								<div class="pokerhand-con__items clearfix"><img src="/img/howtoplay/pc/poker_handranking_9.png" alt=""></div>
							</div>
							<div class="pokerhand-con clearfix">
								<div class="pokerhand-con__items clearfix">
									<h5>10. {!! trans('howto.poker_hand_ranking_list_14') !!}</h5>
									<p>{!! trans('howto.poker_hand_ranking_list_14_desc_pc') !!}</p>
								</div>
								<div class="pokerhand-con__items clearfix"><img src="/img/howtoplay/pc/poker_handranking_10.png" alt=""></div>
							</div>
						</div> {{--pokerhand-wrap--}}
					</div> {{-- // howto--layers--}}

					<div id="betting-system" class="howto--layers"> {{--howto--layers--}}
						<h4>{!! trans('howto.betting_system') !!}</h4>
						<table class="tbl--rules">
							<thead>
								<tr>
									<th class="rules--round">{!! trans('howto.betting_system_round') !!}</th>
									<th class="rules--bet">{!! trans('howto.betting_system_bet') !!}</th>
									<th class="rules--action">{!! trans('howto.betting_system_action') !!}</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td rowspan="4">{!! trans('howto.betting_system_round_1') !!}</td>
									<td>{!! trans('howto.betting_system_bet_1') !!}</td>
									<td>{!! trans('howto.betting_system_action_1_pc') !!}</td>
								</tr>

								<tr>
									<td>{!! trans('howto.betting_system_bet_2') !!}</td>
									<td>{!! trans('howto.betting_system_action_2_pc') !!}</td>
								</tr>

								<tr>
									<td>{!! trans('howto.betting_system_bet_3') !!}</td>
									<td>{!! trans('howto.betting_system_action_3_pc') !!}</td>
								</tr>

								<tr>
									<td>{!! trans('howto.betting_system_bet_4') !!}</td>
									<td>{!! trans('howto.betting_system_action_4_pc') !!}</td>
								</tr>

								<tr>
									<td>{!! trans('howto.betting_system_round_2') !!}</td>
									<td>{!! trans('howto.betting_system_bet_5') !!}</td>
									<td>{!! trans('howto.betting_system_action_5_pc') !!}</td>
								</tr>

								<tr>
									<td>{!! trans('howto.betting_system_round_3') !!}</td>
									<td>{!! trans('howto.betting_system_bet_6') !!}</td>
									<td>{!! trans('howto.betting_system_action_6_pc') !!}</td>
								</tr>

								<tr>
									<td>{!! trans('howto.betting_system_round_4') !!}</td>
									<td>{!! trans('howto.betting_system_bet_7') !!}</td>
									<td>{!! trans('howto.betting_system_action_7_pc') !!}</td>
								</tr>
							</tbody>
						</table>
					</div> {{-- // howto--layers--}}

					<div id="ante_bet_payouts" class="howto--layers"> {{--howto--layers--}}
						<h4>{!! trans('howto.ante_bet_payouts') !!}</h4>
						<ol class="antebet--list">
							{!! trans('howto.ante_bet_payouts_desc_pc') !!}
						</ol>
					</div> {{-- // howto--layers--}}

					<div id="payouts" class="howto--layers"> {{--howto--layers--}}
						<h4>{!! trans('howto.payouts') !!}</h4>
						<h5>{!! trans('howto.bonus_bet_payouts') !!}</h5>
						<table class="tbl--rules">
							<thead>
								<tr>
									<th class="rules--card">{!! trans('howto.players_whole_card') !!}</th>
									<th class="rules--payout">{!! trans('howto.payout') !!}</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{!! trans('howto.players_whole_card_1') !!}</td>
									<td>{!! trans('howto.payout_1') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.players_whole_card_2') !!}</td>
									<td>{!! trans('howto.payout_2') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.players_whole_card_3') !!}</td>
									<td>{!! trans('howto.payout_3') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.players_whole_card_4') !!}</td>
									<td>{!! trans('howto.payout_4') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.players_whole_card_5') !!}</td>
									<td>{!! trans('howto.payout_5') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.players_whole_card_6') !!}</td>
									<td>{!! trans('howto.payout_6') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.players_whole_card_7') !!}</td>
									<td>{!! trans('howto.payout_7') !!}</td>
								</tr>
							</tbody>
						</table>

						<h5>{!! trans('howto.bonus_plus_payouts') !!}</h5>
						<ol class="antebet--list">
							{!! trans('howto.bonus_plus_desc') !!}
						</ol>
						<table class="tbl--rules">
							<thead>
								<tr>
									<th class="rules--card">{!! trans('howto.players_poker_hand') !!}</th>
									<th class="rules--payout">{!! trans('howto.payout') !!}</th>
									<th class="rules--payout">{!! trans('howto.bad_beat') !!}</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{!! trans('howto.players_poker_hand_1') !!}</td>
									<td>{!! trans('howto.payout_8') !!}</td>
									<td>{!! trans('howto.bad_beat_1') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.players_poker_hand_2') !!}</td>
									<td>{!! trans('howto.payout_9') !!}</td>
									<td>{!! trans('howto.bad_beat_2') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.players_poker_hand_3') !!}</td>
									<td>{!! trans('howto.payout_10') !!}</td>
									<td>{!! trans('howto.bad_beat_3') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.players_poker_hand_4') !!}</td>
									<td>{!! trans('howto.payout_11') !!}</td>
									<td>{!! trans('howto.bad_beat_4') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.players_poker_hand_5') !!}</td>
									<td>{!! trans('howto.payout_12') !!}</td>
									<td>{!! trans('howto.bad_beat_5') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.players_poker_hand_6') !!}</td>
									<td>{!! trans('howto.payout_13') !!}</td>
									<td>{!! trans('howto.bad_beat_6') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.players_poker_hand_7') !!}</td>
									<td>{!! trans('howto.payout_14') !!}</td>
									<td>{!! trans('howto.bad_beat_7') !!}</td>
								</tr>
							</tbody>
						</table>

						<h5>{!! trans('howto.pocket_bonus_payouts') !!}</h5>
						<table class="tbl--rules">
							<thead>
								<tr>
									<th class="rules--card">{!! trans('howto.players_hole_cards') !!}</th>
									<th class="rules--payout">{!! trans('howto.payout') !!}</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{!! trans('howto.players_hole_cards_1') !!}</td>
									<td>{!! trans('howto.payout_15') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.players_hole_cards_2') !!}</td>
									<td>{!! trans('howto.payout_16') !!}</td>
								</tr>
							</tbody>
						</table>
					</div> {{-- // howto--layers--}}

					<div id="same-hand-ranking" class="howto--layers hand-rank"> {{--howto--layers--}}
						<h4>{!! trans('howto.same_hand_ranking') !!}</h4>
						{!! trans('howto.same_hand_ranking_desc_pc') !!}

						<ol class="handranking--list">
							<li>
								<span>{!! trans('howto.same_hand_ranking_1') !!}</span>
								<ol class="handranking-sub--list">
									<li>
										<span>{!! trans('howto.same_hand_ranking_1_1_pc') !!}</span>
										<div class="handranking--sub--text">
											<div>
												<p>{!! trans('howto.same_hand_ranking_dealer') !!}</p>
												<p>{!! trans('howto.same_hand_ranking_comcard') !!}</p>
												<p>{!! trans('howto.same_hand_ranking_player') !!}</p>
											</div>
											<img src="/img/howtoplay/dark/pc/same_handranking_1.1_b.png" alt="playboards">
										</div>
									</li>
								</ol>
							</li>
							<li>
								<span>{!! trans('howto.same_hand_ranking_2_pc') !!}</span>
								<ol class="handranking-sub--list">
									<li>
										<span>{!! trans('howto.same_hand_ranking_2_1') !!}</span>
										<div class="handranking--sub--text">
											<div>
												<p>{!! trans('howto.same_hand_ranking_dealer') !!}</p>
												<p>{!! trans('howto.same_hand_ranking_comcard') !!}</p>
												<p>{!! trans('howto.same_hand_ranking_player') !!}</p>
											</div>
											<img src="/img/howtoplay/dark/pc/same_handranking_2.1_b.png" alt="playboards">
										</div>
									</li>
									<li>
										<span>{!! trans('howto.same_hand_ranking_2_2') !!}</span>
										<div class="handranking--sub--text">
											<div>
												<p>{!! trans('howto.same_hand_ranking_dealer') !!}</p>
												<p>{!! trans('howto.same_hand_ranking_comcard') !!}</p>
												<p>{!! trans('howto.same_hand_ranking_player') !!}</p>
											</div>
											<img src="/img/howtoplay/dark/pc/same_handranking_2.2_b.png" alt="playboards">
										</div>
									</li>
								</ol>
							</li>
						</ol>
					</div> {{-- // howto--layers--}}

				</div> {{-- // howto-wrap__items--}}
			</div>
			{{-- <a href="#gamerules"><div class="arrow-up dom-resizable"></div></a> --}}
		</div>
	</div>
</div> {{--// menu-container--}}
