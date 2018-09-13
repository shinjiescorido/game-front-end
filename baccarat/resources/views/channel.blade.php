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
        <div class="channel-con -gamename {{ $betConfig ? is_array($betConfig->type)?$betConfig->type[0]:$betConfig->type : 'normal' }}">
          <span>{!! trans('ingame-web.lobby_gamename_baccarat') !!} {{$tableNum}}</span>
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
      {{-- <div class="ch-items ch-table-name"><span>Baccarat {{$tableNum}}</span></div>
      <div class="ch-items ch-round-num"><span>{{$round_id}}</span></div>
      <div class="ch-items ch-dealer-name"><span></span></div>
      <div class="ch-items ch-range-info range-hide">
        <span id="range-disp">
          {{number_format($rangeDetails->min* $currencyMultiplier * $userMultiplier)}}-{{number_format($rangeDetails->max* $currencyMultiplier * $userMultiplier * $mainMul)}}
        </span>
      </div> --}}
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
  <div id="channel-dropdown">
    <div class="channel-dropdown-con"> {{--channel-dropdwon-con--}}
      <h4>{!! trans('ingame-web.com_sub_betinfoarea_betlimits') !!}</h4>
      <span id="interactive_pin"></span>

      <div class="table-con table--betinfo {{App::getLocale()}}"> {{--table-con--}}
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
            <div class="table-td -bettype">{!! trans('ingame-web.baccarat_betlayout_player') !!}</div>
            <div class="table-td -player-min">{{number_format($rangeDetails->min* $currencyMultiplier * $userMultiplier)}}</div>
            <div class="table-td -player-max">{{number_format($rangeDetails->max* $currencyMultiplier * $userMultiplier * $mainMul)}}</div>
            <div class="table-td -payout -player-payout">1:1</div>
          </div>
          <div class="table-tr">
            <div class="table-td -bettype">{!! trans('ingame-web.baccarat_betlayout_banker') !!}</div>
            <div class="table-td -banker-min">{{number_format($rangeDetails->min* $currencyMultiplier * $userMultiplier)}}</div>
            <div class="table-td -banker-max">{{number_format($rangeDetails->max* $currencyMultiplier * $userMultiplier * $mainMul)}}</div>
            @if($slave == 'supersix')
              <div class="table-td -payout -banker-payout">1:1</div>
            @else
              <div class="table-td -payout -banker-payout">0.95:1</div>
            @endif 
          </div>
          <div class="table-tr">
            <div class="table-td -bettype">{!! trans('ingame-web.baccarat_betlayout_tie') !!}</div>
            <div class="table-td -tie-min">{{number_format($rangeDetails->side_bet[1]->min* $currencyMultiplier * $userMultiplier)}}</div>
            <div class="table-td -tie-max">{{number_format($rangeDetails->side_bet[1]->max* $currencyMultiplier * $userMultiplier * $mainMul)}}</div>
            <div class="table-td -payout -tie-payout">8:1</div>
          </div>
          <div class="table-tr">
            <div class="table-td -bettype">{!! trans('ingame.pair_info') !!}</div>
            <div class="table-td -pair-min"> {{number_format($rangeDetails->side_bet[0]->min* $currencyMultiplier * $userMultiplier)}}</div>
            <div class="table-td -pair-max">{{number_format($rangeDetails->side_bet[0]->max* $currencyMultiplier * $userMultiplier * $mainMul)}}</div>
            <div class="table-td -payout -pair-payout">11:1</div>
          </div>
          <!-- supersix -->
          @if($slave == 'supersix')
          <div class="table-tr supersix">
          @else
          <div class="table-tr supersix -hidden">
          @endif 
            <div class="table-td -bettype">{!! trans('ingame.supersix') !!}</div>
            <div class="table-td -supersix-min"> {{number_format($rangeDetails->side_bet[2]->min* $currencyMultiplier * $userMultiplier)}}</div>
            <div class="table-td -supersix-max">{{number_format($rangeDetails->side_bet[2]->max* $currencyMultiplier * $userMultiplier * $mainMul)}}</div>
            <div class="table-td -payout -supersix-payout">12:1</div>
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
              <span class="ico-livebets ico-player">P</span>
              {!! trans('ingame-web.baccarat_betlayout_player') !!}
              <div class="bar-percentage bar--player"><div class="bar-inner"></div></div>
            </div>
            <div class="table-td -bets">
              <span class="bets-player"></span>
            </div>
            <div class="table-td -players">
              <span class="bets-player-players"></span>
              <span class="ico-users"></span>
            </div>
          </div>
          <div class="table-tr">
            <div class="table-td -bettype">
              <span class="ico-livebets ico-banker">B</span>
              {!! trans('ingame-web.baccarat_betlayout_banker') !!}
              <div class="bar-percentage bar--banker"><div class="bar-inner"></div></div>
            </div>
            <div class="table-td -bets">
              <span class="bets-banker"></span>
            </div>
            <div class="table-td -players">
              <span class="bets-banker-players"></span>
              <span class="ico-users"></span>
            </div>
          </div>
          <div class="table-tr">
            <div class="table-td -bettype">
              <span class="ico-livebets ico-tie">T</span>
              {!! trans('ingame-web.baccarat_betlayout_tie') !!}
              <div class="bar-percentage bar--tie"><div class="bar-inner"></div></div>
            </div>
            <div class="table-td -bets ">
              <span class="bets-tie"></span>
            </div>
            <div class="table-td -players ">
              <span class="bets--tiep-layers"></span>
              <span class="ico-users"></span>
            </div>
          </div>
          <div class="table-tr">
            <div class="table-td -bettype">
              <span class="ico-livebets ico-playerpair">P</span>
              {!! trans('ingame-web.baccarat_betlayout_playerpair') !!}
              <div class="bar-percentage bar--playerpair"><div class="bar-inner"></div></div>
            </div>
            <div class="table-td -bets ">
              <span class="bets-playerpair"></span>
            </div>
            <div class="table-td -players ">
              <span class="bets-playerpair-players"></span>
              <span class="ico-users"></span>
            </div>
          </div>
          <div class="table-tr">
            <div class="table-td -bettype">
              <span class="ico-livebets ico-bankerpair">B</span>
              {!! trans('ingame-web.baccarat_betlayout_bankerpair') !!}
              <div class="bar-percentage bar--bankerpair"><div class="bar-inner"></div></div>
            </div>
            <div class="table-td -bets">
              <span class="bets--bankerpair"></span>
            </div>
            <div class="table-td -players">
              <span class="bets--bankerpair-players"></span>
              <span class="ico-users"></span>
            </div>
          </div>

          <div class="table-tr -total">
            <div class="table-td -bettype">{!! trans('ingame-web.com_sub_betinfoarea_total') !!}</div>
            <div class="table-td -bets ">
              <span class="bets-total"></span>
            </div>
            <div class="table-td -players ">
              <span class="bets-total-players"></span>
              <span class="ico-users-total"></span>
            </div>
          </div>
        </div>
      </div> {{--// table-con--}}
    </div> {{-- // channel-dropdwon-con--}}
  </div>

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
