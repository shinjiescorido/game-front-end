{{-- Menu --}}
<div id="menu-container" class="menu-container lang-{{ App::getLocale() }} mb">
  <div class="menu-con clearfix"> {{--menu-con--}}
    <div class="menu-list"> {{--menu-list--}}
      <div class="menu-list__items">
        <div class="menu-ico menu-video" value='video'>
          <div class="menu-target"></div>
          <i class="ico-menu ico--video"></i>
        </div>

        <div id="menu-video" class="menu-sub-con">
          <div class="menu-sub__items">
            <div class="menu-ico menu-settings" value='reload'>
              <div class="menu-target"></div>
              <i class="ico-menu ico--reload"></i>
            </div>
          </div>
          <div class="menu-sub__items">
            <div class="menu-ico menu-videoquality" value='video-quality'>
              <div class="menu-target"></div>
              <span id="video-quality-text" class="video-quality -hd">
                @if($config->avarta->video == 'HD')
                  SD
                @else
                  HD
                @endif
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="menu-list__items -toggle">
        <div class="menu-ico menu-toggle" value='toggle'>
          <div class="menu-target"></div>
          <i class="ico-menu ico--toggle"></i>
        </div>

        <div id="menu-toggle" class="menu-sub-con">
          <div class="menu-sub__items">
            <div class="menu-ico menu-settings" value='settings'>
              <div class="menu-target"></div>
              <i class="ico-menu ico--settings"></i>
            </div>
          </div>
          <div class="menu-sub__items">
            <div class="menu-ico menu-modifychips" value='modifychips'>
              <div class="menu-target"></div>
              <i class="ico-menu ico--modifychips"></i>
            </div>
          </div>
          @if($junket != 2)
          <div class="menu-sub__items">
            <div class="menu-ico menu-betlogs" value='betlogs'>
              <div class="menu-target"></div>
              <i class="ico-menu ico--betlogs"></i>
            </div>
          </div>
          @endif
          <div class="menu-sub__items">
            <div class="menu-ico menu-howtoplay" value='howtoplay'>
              <div class="menu-target"></div>
              <i class="ico-menu ico--howtoplay"></i>
            </div>
          </div>
          @if($junket && !$isClassic)
          <div class="menu-sub__items">
            <div class="menu-ico menu-chat" value='chat'>
              <div class="menu-target"></div>
              <i class="ico-menu ico--chat"></i>
              <i class="chat-notif-count" value="0"></i>
            </div>
          </div>
          @endif
        </div>
      </div>
    </div> {{-- // menu-list--}}
  </div> {{--// menu-con--}}

  {{-- Menu Settings --}}
  <div class="modal-con modal--settings"> {{--modal-con--}}
    <div class="modal-con__head">
      <span class="modal-head-lbl">{!! trans('ingame.settings') !!}</span>
      <i class="ico-close" value="settings"></i>
    </div>
    <div class="modal-con__body">
      <div class="modal-body__items clearfix">
        <div class="modal-settings-con -sounds">
          <h3>{!! trans('ingame-web.com_sub_settings_sound') !!}</h3>
          <div class="modal-settings__items clearfix">
            <span class="settings--lbl">{!! trans('ingame-web.com_sub_settings_dealersvoice') !!}</span>
            <div class="settings--tool">
              <div id="dealerMuteIco" class="settings-ico settings-mute-ico"></div>
              <div class="settings-volume-bg">
                <div id="dealerSndSlider" class="settings-vol-slider"></div>
              </div>
              <div id="dealerSndCircle" class="settings-volume-circle"></div>
              <div id="dealerMaxIco" class="settings-ico settings-max-ico"></div>
            </div>
          </div>
          <div class="modal-settings__items clearfix">
            <span class="settings--lbl">{!! trans('ingame-web.com_sub_settings_gamesound') !!}</span>
            <div class="settings--tool">
              <div id="gameMuteIco" class="settings-ico settings-mute-ico"></div>
              <div class="settings-volume-bg">
                <div id="gameSndSlider" class="settings-vol-slider"></div>
              </div>
              <div id="gameSndCircle" class="settings-volume-circle"></div>
              <div id="gameMaxIco" class="settings-ico settings-max-ico"></div>
            </div>
          </div>
          <div class="modal-settings__items clearfix">
            <span class="settings--lbl">Music</span>
            <div class="settings--tool">
              <div id="musicMuteIco" class="settings-ico settings-mute-ico"></div>
              <div class="settings-volume-bg">
                <div id="musicSndSlider" class="settings-vol-slider"></div>
              </div>
              <div id="musicSndCircle" class="settings-volume-circle"></div>
              <div id="musicMaxIco" class="settings-ico settings-max-ico"></div>
            </div>
          </div>

          <div class="btn-changemusic">
            <span>Change Music</span>
          </div>
        </div>
        <div class="modal-settings-con -display">
          <h3>{!! trans('ingame-web.com_sub_settings_display') !!}</h3>
          <div class="modal-settings__items clearfix">
            <span class="settings--lbl">{!! trans('ingame-web.com_sub_settings_darktheme') !!}</span>
            <div id="setTheme" class="settings-switch-bg">
              <div id="setThemeCircle" class="settings-switch-circle"></div>
            </div>
          </div>
          <div class="modal-settings__items clearfix">
            <span class="settings--lbl">{!! trans('ingame-web.com_sub_settings_showtutorial') !!}</span>
            <div id="setTut" class="settings-switch-bg switch-tutorial">
              <div id="setTutCircle" class="settings-switch-circle"></div>
            </div>
          </div>
          <div class="modal-settings__items clearfix">
            <span class="settings--lbl">{!! trans('ingame-web.com_sub_settings_language') !!}</span>
            <div class="settings-language-con">
              <div class="flag-con flag-english" value="0">
                <i class="ico-flag ico-flag--en"></i>
              </div>
              <div class="flag-con flag-japan" value="1">
                <i class="ico-flag ico-flag--jp"></i>
              </div>
              <div class="flag-con flag-korea" value="2">
                <i class="ico-flag ico-flag--kr"></i>
              </div>
              <div class="flag-con flag-none">
              </div>
              <div class="flag-con flag-chinese" value="3">
                <i class="ico-flag ico-flag--zh"></i>
              </div>
              <div class="flag-con flag-thai" value="4">
                <i class="ico-flag ico-flag--th"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-body__items">
        <h3>{!! trans('ingame.avatar') !!}</h3>
        <div class="modal-avatar">
          <ul class="modal-avatar-list clearfix">
            <li class="modal-avatar-con -red_king" value="0" avatar="red_king">
              <i class="ico-avatar ico-red_king"></i>
            </li>
            <li class="modal-avatar-con -red_queen" value="1" avatar="red_queen">
              <i class="ico-avatar ico-red_queen"></i>
            </li>
            <li class="modal-avatar-con -red_jack" value="2" avatar="red_jack">
              <i class="ico-avatar ico-red_jack"></i>
            </li>
            <li class="modal-avatar-con -red_joker" value="3" avatar="red_joker">
              <i class="ico-avatar ico-red_joker"></i>
            </li>
            <li class="modal-avatar-con -black_king" value="4" avatar="black_king">
              <i class="ico-avatar ico-black_king"></i>
            </li>
            <li class="modal-avatar-con -black_queen" value="5" avatar="black_queen">
              <i class="ico-avatar ico-black_queen"></i>
            </li>
            <li class="modal-avatar-con -black_jack" value="2" avatar="red_jack">
              <i class="ico-avatar ico-black_jack"></i>
            </li>
            <li class="modal-avatar-con -black_joker" value="7" avatar="black_joker">
              <i class="ico-avatar ico-black_joker"></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div> {{--// modal-con--}}

  {{-- Music Settings --}}
  <div class="modal-con modal--music"> {{--modal-con--}}
    <i class="ico-close" value="music"></i>
    <div class="modal-con__body">
      <div class="modal-radio clearfix">
        <div class="modal-radio-con clearfix">
          <div class="modal-radio-btn checkedRadio">
            <i><input type="radio" name="music1" class="" checked ="checked"/></i>
          </div>
          <span>Music 1</span>
        </div>

        <div class="modal-radio-con clearfix">
          <div class="modal-radio-btn ">
            <i><input type="radio" name="music2" class="" checked =""/></i>
          </div>
          <span>Music 2</span>
        </div>

        <div class="modal-radio-con clearfix">
          <div class="modal-radio-btn ">
            <i><input type="radio" name="music3" class="" checked =""/></i>
          </div>
          <span>Music 3</span>
        </div>

        <div class="modal-radio-con clearfix">
          <div class="modal-radio-btn ">
            <i><input type="radio" name="music4" class="" checked =""/></i>
          </div>
          <span>Music 4</span>
        </div>

        <div class="modal-radio-con clearfix">
          <div class="modal-radio-btn ">
            <i><input type="radio" name="music5" class="" checked =""/></i>
          </div>
          <span>Music 5</span>
        </div>
      </div>

    </div>
    <div class="modal-con__btn">
      <div class="btn-col2 btn-music btn-music--cancel">
        <span>Cancel</span>
      </div>
      <div class="btn-col2 btn-music btn-music--apply">
        <span>Apply Now</span>
      </div>
    </div>
  </div> {{--// modal-con--}}

  {{-- Chat --}}
  <div class="modal-con modal--chat"> {{--modal-con--}}
    <div class="modal-con__head">
      <span class="modal-head-lbl">{!! trans('ingame.Chat') !!}</span>
      <i class="ico-close" value="chat"></i>
    </div>
    <div class="modal-con__body">

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
    
    </div>
  </div> {{--// modal-con--}}

  {{-- Modify Chips --}}
  <div class="modal-con modal--modifychips">
    <div class="modal-con__head">
      <span class="modal-head-lbl">{!! trans('ingame.modifychips') !!}</span>
      <i class="ico-close" value="modifychips"></i>
    </div>
  </div>

  {{-- Menu Bet Logs --}}
  <div class="modal-con modal--betlogs"> {{--modal-con--}}
    <div class="modal-con__head">
      <span class="modal-head-lbl">{!! trans('ingame.betlogs') !!}</span>
      <i class="ico-close" value="betlogs"></i>
    </div>
    <div class="modal-con__body">
      <div class="betlog-nodata">
        <span>{!! trans('ingame-web.other_prompts_mobile_nodata') !!}</span>
      </div>
      <div class="betloglist-table-con">
        <div class="betloglist-table -tablehead -portrait">
          <div class="betloglist-tr">
            <div class="betloglist-td -gamenum">
              <span>{!! trans('ingame-web.com_sub_menuarea_gameno') !!}</span>
            </div>
            <div class="betloglist-td -date">
              <span>{!! trans('ingame-web.com_sub_menuarea_date') !!}</span>
            </div>
            <div class="betloglist-td -totalbet">
              <span>{!! trans('ingame-web.com_sub_menuarea_totalbet') !!}</span>
            </div>
            <div class="betloglist-td -winlose">
              <span>{!! trans('ingame-web.com_sub_menuarea_winlose') !!}</span>
            </div>
          </div>
        </div>
        <div class="betloglist-table -tablehead -landscape">
          <div class="betloglist-tr">
            <div class="betloglist-td -gamenum">
              <span>{!! trans('ingame-web.com_sub_menuarea_gameno') !!}</span>
            </div>
            <div class="betloglist-td -date">
              <span>{!! trans('ingame-web.com_sub_menuarea_date') !!} </span>
            </div>
            <div class="betloglist-td -channel">
              <span>{!! trans('ingame-web.com_sub_menuarea_channel') !!}</span>
            </div>
            <div class="betloglist-td -dealer">
              <span>{!! trans('ingame-web.com_sub_menuarea_dealername') !!}</span>
            </div>
            <div class="betloglist-td -totalbet">
              <span>{!! trans('ingame-web.com_sub_menuarea_totalbet') !!}</span>
            </div>
            <div class="betloglist-td -winlose">
              <span>{!! trans('ingame-web.com_sub_menuarea_winlose') !!}</span>
            </div>
          </div>
        </div>
        <div class="betloglist-table__body">
          <div class="betloglist-table -tablebody">
          </div>
        </div>
        <div class="betloglist-table__pagination">
          <div id="prevPageBetlogs" class="page-ico prev-page-ico"></div>
          <div id="paginationBetlogs" class="page-con">

          </div>
          <div id="nextPageBetlogs" class="page-ico next-page-ico"></div>
        </div>
      </div>
    </div>
  </div> {{--// modal-con--}}

  {{-- Menu Bet Details --}}
  <div class="modal-con modal--betdetails"> {{--modal-con--}}
    <div class="modal-con__head">
      <span class="modal-head-lbl">{!! trans('ingame.winningresult') !!}</span>
      <i class="ico-close" value="betdetails"></i>
    </div>
    <div class="modal-con__body">
      <div class="betlog-result-con clearfix">
        <div class="betlog-result__items -info">
          <div class="betlog-result--inner">
            <span class="betlog-result--roundnum"></span>
            <span class="betlog-result--dealername"></span>
          </div>
        </div>
        <div class="betlog-result__items -result">
          <div class="betlog-result--inner">

          </div>
        </div>
        <div class="betlog-result__items -date">
          <div class="betlog-result--inner">
            <span class="betlog-result--date"></span>
            <span class="betlog-result--time"></span>
          </div>
        </div>
      </div>

      <div class="betlog-result-con clearfix betlog-card">
        <div class="betlog-card__items -dragon">
          <span class="card-value">3</span>
          <span class="card-holder card-0000"></span>
        </div>
        <div class="betlog-card__items -tiger">
          <span class="card-value">8</span>
          <span class="card-holder card-0017"></span>
        </div>
      </div>

      <div class="betlog-table-con">
        <div class="betlog-table tbl--head">
          <div class="betlog-tr">
            <div class="betlog-td -bettype">
              <span>{!! trans('ingame-web.com_sub_menuarea_bettype') !!}</span>
            </div>
            <div class="betlog-td -bets">
              <span>{!! trans('ingame-web.com_sub_menuarea_bets') !!}</span>
            </div>
            <div class="betlog-td -winlose">
              <span>{!! trans('ingame-web.com_sub_menuarea_winlose') !!}</span>
            </div>
          </div>
        </div>
        <div class="betlog-table-body">
          <div class="betlog-table tbl--body">

          </div>
        </div>
      </div>
    </div>
  </div> {{--// modal-con--}}

  {{-- Menu How to Play --}}
  <div class="modal-con modal--howtoplay"> {{--modal-con--}}
    <div class="modal-con__head">
      <span class="modal-head-lbl">{!! trans('ingame-web.com_sub_menuarea_howtoplay') !!}</span>
      <i class="ico-close" value="howtoplay"></i>
    </div>
    <div class="modal-con__body">
      <div class="howto-menu">
        <ul class="gamerules-menu">
         <li class="gamerules-menu__items">
           <a href="#game"></a>
           <span>{!! trans('howto.game_objective') !!}</span>
         </li>
         <li class="gamerules-menu__items">
           <a href="#card-values"></a>
           <span>{!! trans('howto.card_values') !!}</span>
         </li>
         <li class="gamerules-menu__items">
           <a href="#types-baccarat"></a>
           <span>{!! trans('howto.types_baccarat') !!}</span>
         </li>
         <li class="gamerules-menu__items">
           <a href="#game-play"></a>
           <span>{!! trans('howto.game_play') !!}</span>
         </li>
         <li class="gamerules-menu__items">
            <a href="#card-hit"></a>
            <span>{!! trans('howto.3_card_hit') !!}</span>
          </li>
          <li class="gamerules-menu__items">
            <a href="#flippy-table"></a>
            <span>{!! trans('howto.flippy_table') !!}</span>
          </li>
          <li class="gamerules-menu__items">
            <a href="#payouts-table"></a>
            <span>{!! trans('howto.payouts') !!}</span>
          </li>
       </ul>
      </div>
      <div class="howto-con">
        <div id="top" class="howto-wrap__items ">
          <div id="game" class="howto--layers"> {{-- .game-objective --}}
            <p>{!! trans('howto.game_objective_desc') !!}</p>
          </div> {{-- // .game-objective --}}

          <div id="card-values" class="howto--layers"> {{-- .gameplay --}}
            <h4>{!! trans('howto.card_values') !!}</h4>
          </div> {{-- // .gameplay --}}

          <div class="howto--layers card-values clearfix"> {{-- #howto--layers --}}
            <div class="card-values-con clearfix">
              <div class="card-values__items -thumb">
                <img src="/img/menu/howtoplay/card_value_1.png" alt="card value" />
              </div>

              <div class="card-values__items -desc">
                <p>{!! trans('howto.card_values_1') !!}</p>
              </div>
            </div>
            <div class="card-values-con clearfix">
              <div class="card-values__items -thumb">
                <img src="/img/menu/howtoplay/card_value_2.png" alt="card value" />
              </div>

              <div class="card-values__items -desc">
                <p>{!! trans('howto.card_values_2') !!}</p>
              </div>
            </div>
            <div class="card-values-con clearfix">
              <div class="card-values__items -thumb">
                <img src="/img/menu/howtoplay/card_value_3.png" alt="card value" />
              </div>

              <div class="card-values__items -desc">
                <p>{!! trans('howto.card_values_3') !!}</p>
              </div>
            </div>
          </div> {{-- // #howto--layers --}}

          <div id="types-baccarat" class="howto--layers gameplay-list"> {{--howto--layers--}}
            {!! trans('howto.game_play_list') !!}
          </div> {{--// owto--layers--}}

          <div id="game-play" class="howto--layers gameplay-list"> {{--howto--layers--}}
            {!! trans('howto.game_play_list_2') !!}
          </div> {{--// owto--layers--}}

          <div id="card-hit" class="howto--layers"> {{--howto--layers--}}
            <h4>{!! trans('howto.3_card_hit') !!}</h4>
            {!! trans('howto.3_card_hit_desc') !!}
          </div> {{--// owto--layers--}}

          <div class="howto--layers"> {{--howto--layers--}}
            <h5>{!! trans('howto.player_hand') !!}</h5>
            <table class="tbl--rules">
              <thead>
                <tr>
                  <th class="rules--card-value">{!! trans('howto.total_card_value') !!}</th>
                  <th class="rules--action">{!! trans('howto.action') !!}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{!! trans('howto.total_card_value_1') !!}</td>
                  <td>{!! trans('howto.action_1') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto.total_card_value_2') !!}</td>
                  <td>{!! trans('howto.action_2') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto.total_card_value_3') !!}</td>
                  <td>{!! trans('howto.action_3') !!}</td>
                </tr>
              </tbody>
            </table>
          </div> {{--// owto--layers--}}

          <div class="howto--layers"> {{--howto--layers--}}
            <h5>{!! trans('howto.banker_hand') !!}</h5>
            <table class="tbl--rules">
              <thead>
                <tr>
                  <th class="rules--card-value">{!! trans('howto.total_card_value') !!}</th>
                  <th colspan="2" class="rules--player-card">{!! trans('howto.player_3_card') !!}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{!! trans('howto.banker_hand_card_value_1') !!}</td>
                  <td>{!! trans('howto.player_3_card_hit_1') !!}</td>
                  <td>{!! trans('howto.player_3_card_stand_1') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto.banker_hand_card_value_2') !!}</td>
                  <td>{!! trans('howto.player_3_card_hit_2') !!}</td>
                  <td>{!! trans('howto.player_3_card_stand_2') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto.banker_hand_card_value_3') !!}</td>
                  <td>{!! trans('howto.player_3_card_hit_3') !!}</td>
                  <td>{!! trans('howto.player_3_card_stand_3') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto.banker_hand_card_value_4') !!}</td>
                  <td>{!! trans('howto.player_3_card_hit_4') !!}</td>
                  <td>{!! trans('howto.player_3_card_stand_4') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto.banker_hand_card_value_5') !!}</td>
                  <td colspan="2">{!! trans('howto.stand') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto.banker_hand_card_value_6') !!}</td>
                  <td colspan="2">{!! trans('howto.natural_hit') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto.banker_hand_card_value_7') !!}</td>
                  <td colspan="2">{!! trans('howto.hit') !!}</td>
                </tr>
              </tbody>
            </table>
          </div> {{--// owto--layers--}}
          
          <div id="flippy-table" class="howto--layers"> {{--howto--layers--}}
            <h4>{!! trans('howto.flippy_table') !!}</h4>
            <table class="tbl--rules">
              <thead>
                <tr>
                  <th class="rules--card-value">{!! trans('howto.flippy_action') !!}</th>
                  <th class="rules--action">{!! trans('howto.time_peek') !!}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{!! trans('howto.flippy_action_1') !!}</td>
                  <td>{!! trans('howto.time_peek_1') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto.flippy_action_2') !!}</td>
                  <td>{!! trans('howto.time_peek_2') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto.flippy_action_3') !!}</td>
                  <td>{!! trans('howto.time_peek_3') !!}</td>
                </tr>
              </tbody>
            </table>
          </div> {{--// howto--layers--}}

          <div id="payouts-table" class="howto--layers"> {{--howto--layers--}}
            <h4>{!! trans('howto.payouts') !!}</h4>
            <h5>{!! trans('howto.classic_table') !!}</h5>

            <table class="tbl--rules">
              <thead>
                <tr>
                  <th class="rules--card-value">{!! trans('howto.bet_on') !!}</th>
                  <th class="rules--action">{!! trans('howto.payout') !!}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{!! trans('howto.classic_beton_1') !!}</td>
                  <td>{!! trans('howto.classic_result_1') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto.classic_beton_2') !!}</td>
                  <td>{!! trans('howto.classic_result_2') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto.classic_beton_3') !!}</td>
                  <td>{!! trans('howto.classic_result_3') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto.classic_beton_4') !!}</td>
                  <td>{!! trans('howto.classic_result_4') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto.classic_beton_5') !!}</td>
                  <td>{!! trans('howto.classic_result_5') !!}</td>
                </tr>
              </tbody>
            </table>

            <h5>{!! trans('howto.supersix_table') !!}</h5>
            <table class="tbl--rules">
              <thead>
                <tr>
                  <th class="rules--card-value">{!! trans('howto.bet_on') !!}</th>
                  <th class="rules--action">{!! trans('howto.payout') !!}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{!! trans('howto.supersix_beton_1') !!}</td>
                  <td>{!! trans('howto.supersix_result_1') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto.supersix_beton_2') !!}</td>
                  <td>{!! trans('howto.supersix_result_2') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto.supersix_beton_3') !!}</td>
                  <td>{!! trans('howto.supersix_result_3') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto.supersix_beton_4') !!}</td>
                  <td>{!! trans('howto.supersix_result_4') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto.supersix_beton_5') !!}</td>
                  <td>{!! trans('howto.supersix_result_5') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto.supersix_beton_6') !!}</td>
                  <td>{!! trans('howto.supersix_result_6') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto.supersix_beton_7') !!}</td>
                  <td>{!! trans('howto.supersix_result_7') !!}</td>
                </tr>
              </tbody>
            </table>

            <!-- <h5>{!! trans('howto.dragonbonus_table') !!}</h5>
            <table class="tbl--rules">
              <thead>
                <tr>
                  <th class="rules--card-value">{!! trans('howto.bet_on') !!}</th>
                  <th class="rules--action">{!! trans('howto.payout') !!}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{!! trans('howto.dragonbonus_beton_1') !!}</td>
                  <td>{!! trans('howto.dragonbonus_result_1') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto.dragonbonus_beton_2') !!}</td>
                  <td>{!! trans('howto.dragonbonus_result_2') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto.dragonbonus_beton_3') !!}</td>
                  <td>{!! trans('howto.dragonbonus_result_3') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto.dragonbonus_beton_4') !!}</td>
                  <td>{!! trans('howto.dragonbonus_result_4') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto.dragonbonus_beton_5') !!}</td>
                  <td>{!! trans('howto.dragonbonus_result_5') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto.dragonbonus_beton_6') !!}</td>
                  <td>{!! trans('howto.dragonbonus_result_6') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto.dragonbonus_beton_7') !!}</td>
                  <td>{!! trans('howto.dragonbonus_result_7') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto.dragonbonus_beton_8') !!}</td>
                  <td>{!! trans('howto.dragonbonus_result_8') !!}</td>
                </tr>
              </tbody>
            </table>

            <h5>{!! trans('howto.bigsmall_table') !!}</h5>
            <table class="tbl--rules">
              <thead>
                <tr>
                  <th class="rules--card-value">{!! trans('howto.bet_on') !!}</th>
                  <th class="rules--action">{!! trans('howto.payout') !!}</th>
                  <th class="rules--action">{!! trans('howto.condition') !!}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{!! trans('howto.bigsmall_beton_1') !!}</td>
                  <td>{!! trans('howto.bigsmall_result_1') !!}</td>
                  <td>{!! trans('howto.bigsmall_condition_1') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto.bigsmall_beton_2') !!}</td>
                  <td>{!! trans('howto.bigsmall_result_2') !!}</td>
                  <td>{!! trans('howto.bigsmall_condition_2') !!}</td>
                </tr>
              </tbody>
            </table>

            <h5>{!! trans('howto.dragonbonus_win_sample') !!}</h5>
            <ol class="dragonbonus_sample">
              <li>
                <p>{!! trans('howto.win_natural_banker_bonus') !!}</p>
                <div class="card-positioning__items clearfix">
                  <div class="card-positioning-inner"><img src="/img/menu/howtoplay/db_banker1.png" alt="db_banker" /></div>
                  <div class="card-positioning-lbl"><span>{!! trans('howto.bonus_sample_banker') !!}</span></div>
                </div>
                <div class="card-positioning__items clearfix">
                  <div class="card-positioning-inner"><img src="/img/menu/howtoplay/db_player1.png" class="db_player" alt="db_player" /></div>
                  <div class="card-positioning-lbl"><span>{!! trans('howto.bonus_sample_player') !!}</span></div>
                </div>
              </li>
              <li>
                <p>{!! trans('howto.win_by_8') !!}</p>
                <ul>
                  <li><p>{!! trans('howto.win_by_8_desc1') !!}</p></li>
                  <li><p>{!! trans('howto.win_by_8_desc2') !!}</p></li>
                </ul>
                <div class="card-positioning__items clearfix">
                  <div class="card-positioning-inner">
                    <img src="/img/menu/howtoplay/db_banker2.png" alt="db_banker" />
                  </div>
                  <div class="card-positioning-lbl">
                    <span>{!! trans('howto.bonus_sample_banker') !!}</span>
                  </div>
                </div>
                <div class="card-positioning__items clearfix">
                  <div class="card-positioning-inner">
                    <img src="/img/menu/howtoplay/db_player2.png" class="db_player" alt="db_player" />
                  </div>
                  <div class="card-positioning-lbl">
                    <span>{!! trans('howto.bonus_sample_player') !!}</span>
                  </div>
                </div>
              </li>
              <li>
                <p>{!! trans('howto.win_by_less_4') !!}</p>
                <ul>
                  <li><p>{!! trans('howto.win_by_less_4_desc1') !!}</p></li>
                  <li><p>{!! trans('howto.win_by_less_4_desc2') !!}</p></li>
                </ul>
                <div class="card-positioning__items clearfix">
                  <div class="card-positioning-inner">
                    <img src="/img/menu/howtoplay/db_banker3.png" alt="db_banker" />
                  </div>
                  <div class="card-positioning-lbl">
                    <span>{!! trans('howto.bonus_sample_banker') !!}</span>
                  </div>
                </div>
                <div class="card-positioning__items clearfix last-items">
                  <div class="card-positioning-inner">
                    <img src="/img/menu/howtoplay/db_player3.png" class="db_player" alt="db_player" />
                  </div>
                  <div class="card-positioning-lbl">
                    <span>{!! trans('howto.bonus_sample_player') !!}</span>
                  </div>
                </div>
              </li>
            </ol> -->
          </div> {{--// howto--layers--}}
        </div> {{-- // .howto-wrap__items --}}

        <div class="howto-wrap__items -gameplay clearfix" hidden> {{-- .howto-wrap__items --}}
          <div class="howto--layers -two clearfix"> {{-- #howto--layers --}}
            <div class="howto--layers__items -thumb">
              {!! trans('howto.MB_dealers_info_chanel_bet_img') !!}
            </div>

            <div class="howto--layers__items -desc">
              <p>{!! trans('howto.MB_dealers_info_chanel_bet_desc') !!}</p>
            </div>
          </div> {{-- // #howto--layers --}}

          <div class="howto--layers -two clearfix"> {{-- #howto--layers --}}
            <div class="howto--layers__items -thumb">
              {!! trans('howto.MB_playerinfo_img') !!}
            </div>

            <div class="howto--layers__items -desc">
              <h4>{!! trans('howto.playerinfo_title') !!}</h4>
              <p>{!! trans('howto.MB_playerinfo_desc') !!}</p>
            </div>
          </div> {{-- // #howto--layers --}}

          <div class="howto--layers clearfix"> {{-- #howto--layers --}}
            <h4>{!! trans('howto.betinfo_title') !!}</h4>
            {!! trans('howto.MB_betinfo_img') !!}
            <p>{!! trans('howto.MB_betinfo_desc') !!}</p>
          </div> {{-- // #howto--layers --}}

          <div class="howto--layers game-stats clearfix">
            <h4>{!! trans('howto.gamestatistics_title') !!}</h4>
            <p>{!! trans('howto.MB_gamestatistics_desc') !!}</p>
          </div>


          <div class="howto--layers card-display clearfix"> {{-- #howto--layers --}}
            <div class="howto--layers__items">
              <h4>{!! trans('howto.card_display_title') !!}</h4>
              <span class="tx-card-values">{!! trans('howto.card_values') !!}</span>
              <img src="/img/howtoplay/dark/card_display_mb.png" class="card-display-mb changeImg" alt="card_display" />

              <div class="clearfix dragon-tiger">
                <span class="tx-card-dragon1">{!! trans('howto.dragon') !!}</span>
                <span class="tx-card-tiger1">{!! trans('howto.tiger') !!}</span>
              </div>

              <br />

              <span class="tx-card-duringdeal">{!! trans('howto.during_deal') !!}</span>
              <span class="tx-card-resultsshow">{!! trans('howto.results_show') !!}</span>
            </div>
          </div> {{-- // #howto--layers --}}


          <div class="howto--layers betting-wrap clearfix"> {{-- #howto--layers --}}
            <div class="howto--layers__items">
              <h4>{!! trans('howto.betting_buttons_timer_title') !!}</h4>
              <p>{!! trans('howto.MB_betting_buttons_timer_desc') !!}</p>
            </div>
          </div> {{-- // #howto--layers --}}

          <div class="howto--layers chipsrack-wrap clearfix"> {{-- #howto--layers --}}
            <div class="howto--layers__items">
              <h4>{!! trans('howto.chips_rack_title') !!}</h4>
              <p>{!! trans('howto.chips_rack_desc') !!}</p>
              {!! trans('howto.MB_chips_rack_img') !!}
            </div>
          </div> {{-- // #howto--layers --}}

          <div class="howto--layers menu-toggle-wrap clearfix"> {{-- #howto--layers --}}
            <div class="howto--layers__items">
              <h4>{!! trans('howto.menu_toggle_button_title') !!}</h4>
              <p>{!! trans('howto.MB_menu_toggle_button_desc') !!}</p>
            </div>
          </div> {{-- // #howto--layers --}}

          <div class="howto--layers modifychips-wrap clearfix"> {{-- #howto--layers --}}
            <div class="howto--layers__items">
              <h4>{!! trans('howto.modify_chips_title') !!}</h4>
              <p>{!! trans('howto.MB_modify_chips_desc') !!}</p>
              {!! trans('howto.MB_modify_chips_img') !!}
            </div>
          </div> {{-- // #howto--layers --}}

        </div> {{-- // .howto-wrap__items --}}
      </div>

    </div>
  </div> {{--// modal-con--}}
</div> {{--// menu-container--}}
