<div class="channel-wrap">
  <?php
    $mainMul = (floor((int)$mainMultiplier) / 10 * 10) * 0.01;
    $mainMul = $mainMultiplier % 10 ? $mainMul = 1 : $mainMul;
    $rangeDetails = json_decode($rangeDetails);
  ?>
  <div id="channel" class="channel-con clearfix">
    <div id="exit" class="channel-exit">
      <span class="exit-ico"></span>
    </div>
    <div id="channel-detail" class="channel-detail">
      <div class="channel-inner -portrait">
        <div class="channel__items">
          <span class="channel--gamename"><i class="ico-channel--info "></i>{!! trans('ingame-web.lobby_gamename_baccarat') !!} 0{{$table}}</span>
        </div>
        <div class="channel__items">
          <span id="range-disp" class="channel--betrange -portrait">
            @if($rangeDetails->min * $currencyMultiplier * $userMultiplier > 999999)
              {{($rangeDetails->min * $currencyMultiplier * $userMultiplier) / 1000000}}M
            @elseif($rangeDetails->min * $currencyMultiplier * $userMultiplier > 999)
              {{($rangeDetails->min * $currencyMultiplier * $userMultiplier) / 1000}}K
            @else {{$rangeDetails->min * $currencyMultiplier * $userMultiplier}}
            @endif

            -
            @if($rangeDetails->max * $currencyMultiplier * $userMultiplier * $mainMul > 999999)
            {{($rangeDetails->max * $currencyMultiplier * $userMultiplier * $mainMul) / 1000000}}M
            @elseif($rangeDetails->max * $currencyMultiplier * $userMultiplier * $mainMul > 999)
              {{($rangeDetails->max * $currencyMultiplier * $userMultiplier * $mainMul) / 1000}}K
            @else {{$rangeDetails->max * $currencyMultiplier * $userMultiplier * $mainMul}}
            @endif
          </span>
          <span class="channel--roundnum">{{$round_id}}</span>
        </div>
      </div>
      <div class="channel-inner -landscape">
        <i class="ico-channel--info"></i>
        <div class="channel-box">
          <div class="channel__items">
            <span class="channel--gamename">
              {!! trans('ingame-web.lobby_gamename_baccarat') !!} 0{{$table}}
            </span>
          </div>
          <div class="channel__items">
            <span class="channel--roundnum">{{$round_id}}</span>
            <span id="range-disp" class="channel--betrange -landscape">
              @if($rangeDetails->min * $currencyMultiplier * $userMultiplier > 999999)
                {{($rangeDetails->min * $currencyMultiplier * $userMultiplier) / 1000000}}M
              @elseif($rangeDetails->min * $currencyMultiplier * $userMultiplier > 999)
                {{($rangeDetails->min * $currencyMultiplier * $userMultiplier) / 1000}}K
              @else {{$rangeDetails->min * $currencyMultiplier * $userMultiplier}}
              @endif

              -
              @if($rangeDetails->max * $currencyMultiplier * $userMultiplier * $mainMul > 999999)
              {{($rangeDetails->max * $currencyMultiplier * $userMultiplier * $mainMul) / 1000000}}M
              @elseif($rangeDetails->max * $currencyMultiplier * $userMultiplier * $mainMul > 999)
                {{($rangeDetails->max * $currencyMultiplier * $userMultiplier * $mainMul) / 1000}}K
              @else {{$rangeDetails->max * $currencyMultiplier * $userMultiplier * $mainMul}}
              @endif
            </span>

          </div>
        </div>
      </div>
    </div>
    <div id="range-list" hidden  class="channel-rangelist">
      <ul>
        @for($x =0; $x < count($allRange); $x++)
          @if($allRange[$x]->min.'-'.$allRange[$x]->max == $range)
            <li class="range-select selected clearfix" data='{{$allRange[$x]->min}}-{{$allRange[$x]->max}}'>
              <span class="range-min">{{number_format($allRange[$x]->min * $currencyMultiplier * $userMultiplier)}}</span>
              <span class="range-dash">-</span>
              <span class="range-max">{{number_format($allRange[$x]->max * $currencyMultiplier * $userMultiplier * $mainMul)}}</span>
            </li>
          @else
            <li class="range-select clearfix" data='{{$allRange[$x]->min}}-{{$allRange[$x]->max}}'>
              <span class="range-min">{{number_format($allRange[$x]->min * $currencyMultiplier * $userMultiplier)}}</span>
              <span class="range-dash">-</span>
              <span class="range-max">{{number_format($allRange[$x]->max * $currencyMultiplier * $userMultiplier * $mainMul)}}</span>
            </li>
          @endif
        @endfor
      </ul>
    </div>
  </div>

  {{-- Chat --}}
  <div class="modal-con modal--betlimit"> {{--modal-con--}}
    <div class="modal-con__head">
      <span class="modal-head-lbl">{!! trans('ingame-web.lobby_gamename_baccarat') !!}</span>
      <i class="ico-close" value="betlimit"></i>
    </div>
    <div class="modal-con__body">
      <div class="betlimit-con">
        <h3>{!! trans('ingame-web.com_sub_betinfoarea_betlimits') !!}</h3>
        <div class="betlimit-table tbl--head">
          <div class="betlimit-table-tr">
            <div class="betlimit-table-td -bettype">{!! trans('ingame-web.com_sub_betinfoarea_bettype') !!}</div>
            <div class="betlimit-table-td -min">{!! trans('ingame-web.com_sub_betinfoarea_min') !!}</div>
            <div class="betlimit-table-td -max">{!! trans('ingame-web.com_sub_betinfoarea_max') !!}</div>
            <div class="betlimit-table-td -payout">{!! trans('ingame-web.com_sub_betinfoarea_payouts') !!}</div>
          </div>
        </div>
        <div class="betlimit-table tbl--body">
          <div class="betlimit-table-tr">
            <div class="betlimit-table-td -bettype">{!! trans('ingame-web.baccarat_betlayout_player') !!}</div>
            <div class="betlimit-table-td -min betlimit-min">
              {{number_format($rangeDetails->min* $currencyMultiplier * $userMultiplier)}}
            </div>
            <div class="betlimit-table-td -max betlimit-max">
              {{number_format($rangeDetails->max* $currencyMultiplier * $userMultiplier * $mainMul)}}
            </div>
            <div class="betlimit-table-td -payout">1:1</div>
          </div>
          <div class="betlimit-table-tr">
            <div class="betlimit-table-td -bettype">{!! trans('ingame-web.baccarat_betlayout_banker') !!}</div>
            <div class="betlimit-table-td -min betlimit-min">
              {{number_format($rangeDetails->min * $currencyMultiplier * $userMultiplier)}}
            </div>
            <div class="betlimit-table-td -max betlimit-max">
              {{number_format($rangeDetails->max * $currencyMultiplier * $userMultiplier * $mainMul)}}
            </div>
            <div class="betlimit-table-td -payout">1:1</div>
          </div>
          <div class="betlimit-table-tr">
            <div class="betlimit-table-td -bettype">{!! trans('ingame-web.baccarat_betlayout_tie') !!}</div>
            <div class="betlimit-table-td -min betlimit-tie-min">
              {{number_format($rangeDetails->side_bet[0]->min * $currencyMultiplier * $userMultiplier)}}
            </div>
            <div class="betlimit-table-td -max betlimit-tie-max">
              {{number_format($rangeDetails->side_bet[0]->max * $currencyMultiplier * $userMultiplier * $mainMul)}}
            </div>
            <div class="betlimit-table-td -payout">8:1</div>
          </div>
          <div class="betlimit-table-tr">
            <div class="betlimit-table-td -bettype">{!! trans('ingame.pair_info') !!}</div>
            <div class="betlimit-table-td -min betlimit-tie-min">
              {{number_format($rangeDetails->side_bet[0]->min * $currencyMultiplier * $userMultiplier)}}
            </div>
            <div class="betlimit-table-td -max betlimit-tie-max">
              {{number_format($rangeDetails->side_bet[0]->max * $currencyMultiplier * $userMultiplier * $mainMul)}}
            </div>
            <div class="betlimit-table-td -payout">11:1</div>
          </div>
        </div>
      </div>
      <div class="betlimit-con -livebets">
        <h3>{!! trans('ingame-web.com_sub_betinfoarea_livebets') !!}</h3>

        <div class="betlimit-table tbl--head">
          <div class="betlimit-table-tr">
            <div class="betlimit-table-td -bettype">{!! trans('ingame-web.com_sub_betinfoarea_bettype') !!}</div>
            <div class="betlimit-table-td -bets">{!! trans('ingame-web.com_sub_betinfoarea_bets') !!}</div>
            <div class="betlimit-table-td -players">{!! trans('ingame-web.com_sub_betinfoarea_players') !!}</div>
          </div>
        </div>
        <div class="betlimit-table tbl--body">
          <div class="betlimit-table-tr">
            <div class="betlimit-table-td -bettype">
              <span class="ico-livebets ico-dragon">D</span>
              {!! trans('ingame-web.dragontiger_betlayout_dragon') !!}
              <div class="bar-percentage bar--dragon">
                <div class="bar-inner"></div>
              </div>
            </div>
            <div class="betlimit-table-td -bets "><span class="bets-dragon"></span></div>
            <div class="betlimit-table-td -players ">
              <span class="bets-dragonplayer"></span>
              <span class="ico-users"></span>
            </div>
          </div>
          <div class="betlimit-table-tr">
            <div class="betlimit-table-td -bettype">
              <span class="ico-livebets ico-tiger">T</span>
              {!! trans('ingame-web.dragontiger_betlayout_tiger') !!}
              <div class="bar-percentage bar--tiger">
                <div class="bar-inner"></div>
              </div>
            </div>
            <div class="betlimit-table-td -bets "><span class="bets-tiger"></span></div>
            <div class="betlimit-table-td -players ">
              <span class="bets-tigerplayer"></span>
              <span class="ico-users"></span>
            </div>
          </div>
          <div class="betlimit-table-tr">
            <div class="betlimit-table-td -bettype">
              <span class="ico-livebets ico-tie">T</span>
              {!! trans('ingame-web.dragontiger_betlayout_tie') !!}
              <div class="bar-percentage bar--tie">
                <div class="bar-inner"></div>
              </div>
            </div>
            <div class="betlimit-table-td -bets "><span class="bets-tie"></span></div>
            <div class="betlimit-table-td -players ">
              <span class="bets-tieplayer"></span>
              <span class="ico-users"></span>
            </div>
          </div>

          <div class="betlimit-table-tr -total">
            <div class="betlimit-table-td -bettype">{!! trans('ingame-web.com_sub_betinfoarea_total') !!}</div>
            <div class="betlimit-table-td -bets "><span class="bets-total"></span></div>
            <div class="betlimit-table-td -players ">
              <span class="bets-totalplayer"></span>
              <span class="ico-users-total"></span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div> {{--// modal-con--}}


  @if(isset($_GET['token']) && $junket == 2) {{-- isset($_GET['token']) --}}
    {{-- Junket --}}
    <div id="junket-info" class="junket-con">
      <div id="junketHeader" class="modal-header">
        <div id="junketRoomName" class="menu-header-txt">{{ json_decode($vendorData)->title }}</div>
        <div id="junketRoomExpiry" class="menu-timer menu-header-txt">00:00</div>
        <i id="junket-agent-info-closebtn" class="ico-close" value="agent-info"></i>

        {{--<div class="timer-ico"></div>--}}
        {{-- <div class="menu-close-ico"></div> --}}
      </div>

      <div class="junket-body-info -junket-toggle">
        <div class="btn-junket room-info active"><span>Room Info</span></div>
        <div class="btn-junket room-users"><span>Users</span></div>
        <div class="btn-junket room-balance"><span>Balance</span></div>
      </div>
      <div class="junket-body-info -junket-room">
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

      </div>
      <div class="junket-body-info -junket-buttons">
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
