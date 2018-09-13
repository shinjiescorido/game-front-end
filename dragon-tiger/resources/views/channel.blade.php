{{-- channel --}}
<div class="channel-container dom-resizable selected-lang-{{ App::getLocale() }}">
  <?php
    $mainMul = (floor((int)$mainMultiplier) / 10 * 10) * 0.01;
    $mainMul = $mainMultiplier % 10 ? $mainMul = 1 : $mainMul;
    $rangeDetails = json_decode($rangeDetails);
  ?>
  <div id="channel">
    <div id="exit">
      <span class="exit-ico"></span>
    </div>
    <div id="channel-detail">
      <div class="channel-items">
        <div class="channel-con -gamename">
          <span>{!! trans('ingame-web.lobby_gamename_dragontiger') !!} {{$tableNum}}</span>
        </div>
        <div class="channel-con -gamenumber">
          <span>{{$round_id}}</span>
        </div>
      </div>
      <div class="channel-items">
        <div class="channel-con -dealername">
          <span></span>
        </div>
        <div class="channel-con -betrange">
          <span id="range-disp">
            @if($rangeDetails->min * $currencyMultiplier * $userMultiplier > 999999)
              {{($rangeDetails->min * $currencyMultiplier * $userMultiplier) / 1000000}}M
            @elseif($rangeDetails->min * $currencyMultiplier * $userMultiplier > 999)
              {{($rangeDetails->min * $currencyMultiplier * $userMultiplier) / 1000}}K
            @else
              {{($rangeDetails->min * $currencyMultiplier * $userMultiplier)}}
            @endif

            -

            @if($rangeDetails->max * $currencyMultiplier * $userMultiplier * $mainMul > 999999)
              {{($rangeDetails->max * $currencyMultiplier * $userMultiplier * $mainMul) / 1000000}}M
            @elseif($rangeDetails->max * $currencyMultiplier * $userMultiplier * $mainMul > 999)
              {{($rangeDetails->max * $currencyMultiplier * $userMultiplier * $mainMul) / 1000}}K
            @else
              {{($rangeDetails->max * $currencyMultiplier * $userMultiplier * $mainMul)}}
            @endif
          </span>
        </div>
      </div>
    </div>
  </div>
  <div id="range-list" hidden>
    @for($x =0; $x < count($allRange); $x++)
      @if($allRange[$x]->min.'-'.$allRange[$x]->max == $range)
        <button class="range-select selected" data='{{$allRange[$x]->min}}-{{$allRange[$x]->max}}'>
          <span class="range-min">{{number_format($allRange[$x]->min * $currencyMultiplier * $userMultiplier)}}</span>
          <span class="range-dash">-</span>
          <span class="range-max">{{number_format($allRange[$x]->max * $currencyMultiplier * $userMultiplier * $mainMul)}}</span>
        </button>
      @else
        <button class="range-select" data='{{$allRange[$x]->min}}-{{$allRange[$x]->max}}'>
          <span class="range-min">{{number_format($allRange[$x]->min * $currencyMultiplier * $userMultiplier)}}</span>
          <span class="range-dash">-</span>
          <span class="range-max">{{number_format($allRange[$x]->max * $currencyMultiplier * $userMultiplier * $mainMul)}}</span>
        </button>
      @endif
    @endfor
  </div>

  <div id="notice" class="maintenance-con"> {{--maintenance-con--}}
    <div class="maintenance-head">
      <span class="maintenance-title">{!! trans('ingame-web.com_sub_ingameprompts_announcements') !!}</span>
      <span class="maintenance-close"></span>
    </div>
    <div class="maintenance-body">
      <span id="notice-msg"></span>
    </div>
  </div> {{-- // maintenance-con--}}

  {{-- channel details --}}
  <div id="channel-dropdown"> {{--channel-dropdown--}}
    <div class="channel-dropdown-con"> {{--channel-dropdwon-con--}}
      <h4>{!! trans('ingame-web.com_sub_betinfoarea_betlimits') !!}</h4>
      <span id="interactive_pin"></span>

      <div class="table-con table--betinfo"> {{--table-con--}}
        <div class="table-head">
          <div class="table-tr">
            <div class="table-th -bettype">{!! trans('ingame-web.com_sub_betinfoarea_bettype') !!}</div>
            <div class="table-th -min">{!! trans('ingame-web.com_sub_betinfoarea_min') !!}</div>
            <div class="table-th -max">{!! trans('ingame-web.com_sub_betinfoarea_max') !!}</div>
            <div class="table-th -payout">{!! trans('ingame-web.com_sub_betinfoarea_payouts') !!}</div>
          </div>
        </div>
        <div class="table-body">
          <div class="table-tr">
            <div class="table-td -bettype">{!! trans('ingame-web.dragontiger_betlayout_dragon') !!}</div>
            <div class="table-td bet-limit-min">
              {{number_format($rangeDetails->min * $currencyMultiplier * $userMultiplier)}}
            </div>
            <div class="table-td bet-limit-max">
              {{number_format($rangeDetails->max * $currencyMultiplier * $userMultiplier * $mainMul)}}
            </div>
            <div class="table-td -payout">1:1</div>
          </div>
          <div class="table-tr">
            <div class="table-td -bettype">{!! trans('ingame-web.dragontiger_betlayout_tiger') !!}</div>
            <div class="table-td bet-limit-min">
              {{number_format($rangeDetails->min * $currencyMultiplier * $userMultiplier)}}
            </div>
            <div class="table-td bet-limit-max">
              {{number_format($rangeDetails->max * $currencyMultiplier * $userMultiplier * $mainMul)}}
            </div>
            <div class="table-td -payout">1:1</div>
          </div>
          <div class="table-tr">
            <div class="table-td -bettype">{!! trans('ingame-web.dragontiger_betlayout_tie') !!}</div>
            <div class="table-td bet-limit-tie-min">
              {{number_format($rangeDetails->side_bet[0]->min * $currencyMultiplier * $userMultiplier)}}
            </div>
            <div class="table-td bet-limit-tie-max">
              {{number_format($rangeDetails->side_bet[0]->max * $currencyMultiplier * $userMultiplier * $mainMul)}}
            </div>
            <div class="table-td -payout">10:1</div>
          </div>
        </div>
      </div> {{--// table-con--}}
    </div> {{-- // channel-dropdwon-con--}}

    <div id="liveBetsCon" class="channel-dropdown-con"> {{--channel-dropdwon-con--}}
      <h4>{!! trans('ingame-web.com_sub_betinfoarea_livebets') !!}</h4>
      <div class="table-con table--livebets"> {{--table-con--}}
        <div class="table-head">
          <div class="table-tr">
            <div class="table-th -bettype">{!! trans('ingame-web.com_sub_betinfoarea_bettype') !!}</div>
            <div class="table-th -bets">{!! trans('ingame-web.com_sub_betinfoarea_bets') !!}</div>
            <div class="table-th -players">{!! trans('ingame-web.com_sub_betinfoarea_players') !!}</div>
          </div>
        </div>
        <div class="table-body">
          <div class="table-tr">
            <div class="table-td -bettype">
              <span class="ico-livebets ico-dragon">D</span>
              {!! trans('ingame-web.dragontiger_betlayout_dragon') !!}
              <div class="bar-percentage bar--dragon">
                <div class="bar-inner"></div>
              </div>
            </div>
            <div class="table-td -bets "><span class="bets-dragon"></span></div>
            <div class="table-td -players ">
              <span class="bets-dragonplayer"></span>
              <span class="ico-users"></span>
            </div>
          </div>
          <div class="table-tr">
            <div class="table-td -bettype">
              <span class="ico-livebets ico-tiger">T</span>
              {!! trans('ingame-web.dragontiger_betlayout_tiger') !!}
              <div class="bar-percentage bar--tiger">
                <div class="bar-inner"></div>
              </div>
            </div>
            <div class="table-td -bets "><span class="bets-tiger"></span></div>
            <div class="table-td -players ">
              <span class="bets-tigerplayer"></span>
              <span class="ico-users"></span>
            </div>
          </div>
          <div class="table-tr">
            <div class="table-td -bettype">
              <span class="ico-livebets ico-tie">T</span>
              {!! trans('ingame-web.dragontiger_betlayout_tie') !!}
              <div class="bar-percentage bar--tie">
                <div class="bar-inner"></div>
              </div>
            </div>
            <div class="table-td -bets "><span class="bets-tie"></span></div>
            <div class="table-td -players ">
              <span class="bets-tieplayer"></span>
              <span class="ico-users"></span>
            </div>
          </div>

          <div class="table-tr -total">
            <div class="table-td -bettype">{!! trans('ingame-web.com_sub_betinfoarea_total') !!}</div>
            <div class="table-td -bets "><span class="bets-total"></span></div>
            <div class="table-td -players ">
              <span class="bets-totalplayer"></span>
              <span class="ico-users-total"></span>
            </div>
          </div>
        </div>
      </div> {{--// table-con--}}
    </div> {{-- // channel-dropdwon-con--}}
  </div> {{-- // channel-dropdown--}}

  @if(isset($_GET['token']) && $junket == 2) {{-- isset($_GET['token']) --}}
    {{-- Junket --}}
    <div id="junket-info" class="junket-con">
      <div id="junketHeader" class="modal-header">
        <div id="junketRoomName" class="menu-header-txt">{{ json_decode($vendorData)->title }}</div>
        <div id="junketRoomExpiry" class="menu-timer menu-header-txt">00:00</div>

        {{--<div class="timer-ico"></div>--}}
        {{-- <div class="menu-close-ico"></div> --}}
      </div>

      <div class="junket-body-info">
        <div class="junket-info-list">
          <div class="info-list-left">
            <span class="agent-ico"></span>
            <span class="agent-name">{{ json_decode($vendorData)->bankerUsername }}</span>
          </div>
          {{-- <span id="junket_interactive_pin"></span> --}}
          {{--- <div id="agentMoney" class="info-list-right">0</div> --}}
        </div>

        <div class="junket-info-list">
          <div class="info-list-left">{!! trans('ingame.totalplayers') !!}</div>
          <div id="totalPlayers" class="info-list-right">0</div>
        </div>

        <div class="junket-info-list">
          <div class="info-list-left">{!! trans('ingame.totalbets') !!}</div>
          <div id="totalJunketBets" class="info-list-right">0</div>
        </div>

        <div class="btn-junket disband-room"><span>{!! trans('ingame-web.nihtanjunket_ingame_closeroom') !!}</span></div>
        <div class="btn-junket change-password"><span>{!! trans('ingame-web.com_sub_rooms_changepassword') !!}</span></div>
      </div>

      <div class="junket-player-con noselect">
        <div class="junket-player-header">
          <div class="player-header-list header-username">{!! trans('ingame.username') !!}</div>
          <div class="player-header-list header-credit">{!! trans('ingame.credit') !!}</div>
          <div class="player-header-list header-bets">{!! trans('ingame.bets') !!}</div>
          <div class="player-header-list header-winlose">{!! trans('ingame.win') !!}/{!! trans('ingame.lose') !!}</div>
        </div>

        <div class="junket-player-bg">
          <div class="player-tbl-con">
            <div class="table-con table--junket"> {{--table-con--}}
                  <div id="junketPlayerList" class="table-body">
                      {{-- Player list here --}}
                  </div>
                </div> {{--// table-con--}}
            </div>
        </div>
      </div>
    </div>
  @endif
</div>
