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
          <span>{!! trans('ingame-web.lobby_gamename_poker') !!} {{$tableNum}}</span>
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
            <div class="table-td -bettype">{!! trans('ingame-web.poker_betlayout_ante') !!}</div>
            <div class="table-td bet-limit-min">
              {{number_format($rangeDetails->min * $currencyMultiplier * $userMultiplier)}}
            </div>
            <div class="table-td bet-limit-max">
              {{number_format($rangeDetails->max * $currencyMultiplier * $userMultiplier * $mainMul)}}
            </div>
            <div class="table-td -payout">1:1</div>
          </div>
        </div>
      </div> {{--// table-con--}}
    </div> {{-- // channel-dropdwon-con--}}

    <div class="channel-dropdown-con slave-bonus"> {{--channel-dropdwon-con--}}
      <h4>{!! trans('howto.bonus_plus_payouts') !!}</h4>
      <div class="table-con table--payouts"> {{--table-con--}}
        <div class="table-head">
          <div class="table-tr">
            <div class="table-th -pokerhand">{!! trans('howto.players_poker_hand') !!}</div>
            <div class="table-th -payout">{!! trans('howto.payout') !!}</div>
            <div class="table-th -badbeat">{!! trans('howto.bad_beat') !!}</div>
          </div>
        </div>
        <div class="table-body">
          <div class="table-tr">
            <div class="table-td -pokerhand">{!! trans('howto.players_poker_hand_1') !!}</div>
            <div class="table-td -payout">{!! trans('howto.payout_8') !!}</div>
            <div class="table-td -badbeat">{!! trans('howto.bad_beat_1') !!}</div>
          </div>
          <div class="table-tr">
            <div class="table-td -pokerhand">{!! trans('howto.players_poker_hand_2') !!}</div>
            <div class="table-td -payout">{!! trans('howto.payout_9') !!}</div>
            <div class="table-td -badbeat">{!! trans('howto.bad_beat_2') !!}</div>
          </div>
          <div class="table-tr">
            <div class="table-td -pokerhand">{!! trans('howto.players_poker_hand_3') !!}</div>
            <div class="table-td -payout">{!! trans('howto.payout_10') !!}</div>
            <div class="table-td -badbeat">{!! trans('howto.bad_beat_3') !!}</div>
          </div>
          <div class="table-tr">
            <div class="table-td -pokerhand">{!! trans('howto.players_poker_hand_4') !!}</div>
            <div class="table-td -payout">{!! trans('howto.payout_11') !!}</div>
            <div class="table-td -badbeat">{!! trans('howto.bad_beat_4') !!}</div>
          </div>
          <div class="table-tr">
            <div class="table-td -pokerhand">{!! trans('howto.players_poker_hand_5') !!}</div>
            <div class="table-td -payout">{!! trans('howto.payout_12') !!}</div>
            <div class="table-td -badbeat">{!! trans('howto.bad_beat_5') !!}</div>
          </div>
          <div class="table-tr">
            <div class="table-td -pokerhand">{!! trans('howto.players_poker_hand_6') !!}</div>
            <div class="table-td -payout">{!! trans('howto.payout_13') !!}</div>
            <div class="table-td -badbeat">{!! trans('howto.bad_beat_6') !!}</div>
          </div>
          <div class="table-tr">
            <div class="table-td -pokerhand">{!! trans('howto.players_poker_hand_7') !!}</div>
            <div class="table-td -payout">{!! trans('howto.payout_14') !!}</div>
            <div class="table-td -badbeat">{!! trans('howto.bad_beat_7') !!}</div>
          </div>
        </div>
      </div> {{--// table-con--}}
    </div> {{-- // channel-dropdwon-con--}}

    <div class="channel-dropdown-con slave-bonus"> {{--channel-dropdwon-con--}}
      <h4>{!! trans('howto.pocket_bonus_payouts') !!}</h4>
      <div class="table-con table--payouts"> {{--table-con--}}
        <div class="table-head">
          <div class="table-tr">
            <div class="table-th -pokerhand">{!! trans('howto.players_hole_cards') !!}</div>
            <div class="table-th -payout">{!! trans('howto.payout') !!}</div>
          </div>
        </div>
        <div class="table-body">
          <div class="table-tr">
            <div class="table-td -pokerhand">{!! trans('howto.players_hole_cards_1') !!}</div>
            <div class="table-td -payout">{!! trans('howto.payout_15') !!}</div>
          </div>
          <div class="table-tr">
            <div class="table-td -pokerhand">{!! trans('howto.players_hole_cards_2') !!}</div>
            <div class="table-td -payout">{!! trans('howto.payout_16') !!}</div>
          </div>
        </div>
      </div> {{--// table-con--}}
    </div> {{-- // channel-dropdwon-con--}}

    <div class="channel-dropdown-con slave-classic"> {{--channel-dropdwon-con--}}
      <h4>{!! trans('howto.bonus_bet_payouts') !!}</h4>
      <div class="table-con table--payouts"> {{--table-con--}}
        <div class="table-head">
          <div class="table-tr">
            <div class="table-th -pokerhand">{!! trans('howto.players_whole_card') !!}</div>
            <div class="table-th -payout">{!! trans('howto.payout') !!}</div>
          </div>
        </div>
        <div class="table-body">
          <div class="table-tr">
            <div class="table-td -pokerhand">{!! trans('howto.players_whole_card_1') !!}</div>
            <div class="table-td -payout">{!! trans('howto.payout_1') !!}</div>
          </div>
          <div class="table-tr">
            <div class="table-td -pokerhand">{!! trans('howto.players_whole_card_2') !!}</div>
            <div class="table-td -payout">{!! trans('howto.payout_2') !!}</div>
          </div>
          <div class="table-tr">
            <div class="table-td -pokerhand">{!! trans('howto.players_whole_card_3') !!}</div>
            <div class="table-td -payout">{!! trans('howto.payout_3') !!}</div>
          </div>
          <div class="table-tr">
            <div class="table-td -pokerhand">{!! trans('howto.players_whole_card_4') !!}</div>
            <div class="table-td -payout">{!! trans('howto.payout_4') !!}</div>
          </div>
          <div class="table-tr">
            <div class="table-td -pokerhand">{!! trans('howto.players_whole_card_5') !!}</div>
            <div class="table-td -payout">{!! trans('howto.payout_5') !!}</div>
          </div>
          <div class="table-tr">
            <div class="table-td -pokerhand">{!! trans('howto.players_whole_card_6') !!}</div>
            <div class="table-td -payout">{!! trans('howto.payout_6') !!}</div>
          </div>
          <div class="table-tr">
            <div class="table-td -pokerhand">{!! trans('howto.players_whole_card_7') !!}</div>
            <div class="table-td -payout">{!! trans('howto.payout_7') !!}</div>
          </div>
        </div>
      </div> {{--// table-con--}}
    </div> {{-- // channel-dropdwon-con--}}

  </div>

</div>
