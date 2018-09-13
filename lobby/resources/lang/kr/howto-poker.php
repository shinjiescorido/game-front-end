<?php

/* KOREAN */

return [
    /***** SIDE MENU ******/
    'game_objective'                  => '게임 목표',
    'gameplay'                        => '게임 방법',
    'poker_hand_rankings'             => '포커의 핸드 랭킹',
    'betting_system'                  => '베팅 시스템',
    'ante_bet_payouts'                => '안테 베팅의 배당률',
    'payouts'                         => '배당금',
    'bonus_bet_payouts'               => '텍사스 홀덤 포커 보너스 베팅의 배당률',
    'bonus_plus_payouts'              => '포커 보너스 플러스 베팅의 배당률',
    'bad_beat_rule'                   => 'Bad Beat',
    'pocket_bonus_payouts'            => '포커 포켓 보너스의 배당률',
    'same_hand_ranking'               => '타이 (TIE)',


    /* pc */
    'game_objective_desc_pc'          => '<p>텍사스 홀덤 포커는 딜러를 상대로 더 높은 핸드를 획득하여 팟을 승리하는 형식의 게임입니다.</p>',
    /* mobile */
    'game_objective_desc_mb'          => '<p>텍사스 홀덤 포커는 딜러를 상대로 더 높은 핸드를 획득하여 팟을<br/>승리하는 형식의 게임입니다.</p>',

    /* pc */
    'gameplay_desc_pc'                => '
                                         <li> <span> 베팅 시간이 종료되면 각 두 장의 홀 카드가 플레이어 및 딜러에게 차례대로 주어집니다. 이때  플레이어 <br> 카드는 모두 오픈됩니다. </span> </li>
                                         <li> <span> 총 다섯 장의 커뮤니티 카드는 ‘플롭(Flop)’, ‘턴(Turn)’,<br/>‘리버(River)’ 세 단계로 나뉘어 지정된 위치에<br/>놓여집니다. </span> </li>
                                         <li> <span> 플레이어는 각 단계 시작 전 ‘레이즈(Raise) 또는 폴드(Fold)’ 및 ‘콜(Call) 또는 체크(Check)’의 베팅 옵션을<br/>선택할 수 있습니다. </span> </li>
                                         <li> <span> 딜러의 홀 카드는 ‘리버(River)’ 카드가 오픈된 뒤에<br/>공개됩니다. </span> </li>
                                         <li> <span> 만약 플레이어와 딜러의 홀 카드 중 최고 핸드를<br/>이루는 5장의 카드가 동일하거나 존재하지 않는 경우<br/>결과는 ‘타이(Tie)’ 처리되며 플레이어의 베팅금은<br>반환됩니다. </span> </li>
                                            ',
    /* mobile */
    'gameplay_desc_mb'                => '
                                         <li> <span> 베팅 시간이 종료되면 각 두 장의 홀 카드가 플레이어 및 딜러에게<br/>차례대로 주어집니다. 이때 플레이어 카드는 모두 오픈됩니다. </span> </li>
                                         <li> <span> 총 다섯 장의 커뮤니티 카드는 ‘플롭(Flop)’, ‘턴(Turn)’, ‘리버(River)’<br/>세 단계로 나뉘어 지정된 위치에 놓여집니다. </span> </li>
                                         <li> <span> 플레이어는 각 단계 시작 전 ‘레이즈(Raise) 또는 폴드(Fold)’ 및 ‘콜(Call) 또는 체크(Check)’의 베팅 옵션을 선택할 수 있습니다. </span> </li>
                                         <li> <span> 딜러의 홀 카드는 ‘리버(River)’ 카드가 오픈된 뒤에 공개됩니다. </span> </li>
                                         <li> <span> 만약 플레이어와 딜러의 홀 카드 중 최고 핸드를 이루는 5장의 카드가 동일하거나 존재하지 않는 경우 결과는 ‘타이(Tie)’ 처리되며 플레이어의 베팅금은 반환됩니다. </span> </li>
                                         ',

    'card_rank'                       => '',
    'card_rank_desc_pc'               => '',
    'card_rank_desc_mb'               => '',

    'poker_hand_ranking_list_1'          => '로얄 플러시 (Royal Flush)',
    'poker_hand_ranking_list_1_desc_pc'  => '동일한 무늬의 카드 A, K, Q, J, 10 으로 이루어진 핸드',
    'poker_hand_ranking_list_1_desc_mb'  => '동일한 무늬의 카드 A, K, Q, J, 10 으로 이루어진 핸드',

    'poker_hand_ranking_list_2'          => '스트레이트 플러시 (Straight Flush)',
    'poker_hand_ranking_list_2_desc_pc'  => '동일한 무늬의 연속되는 카드 값 다섯 장으로 이루어진 핸드',
    'poker_hand_ranking_list_2_desc_mb'  => '동일한 무늬의 연속되는 카드 값 다섯 장으로 이루어진 핸드',

    'poker_hand_ranking_list_3'          => '가장 높은 스트레이트 플러시-',
    'poker_hand_ranking_list_3_desc_pc'  => 'K-Q-J-10-9',
    'poker_hand_ranking_list_3_desc_mb'  => 'K-Q-J-10-9',

    'poker_hand_ranking_list_4'          => '가장 낮은 스트레이트 플러시-',
    'poker_hand_ranking_list_4_desc_pc'  => '5-4-3-2-A',
    'poker_hand_ranking_list_4_desc_mb'  => '5-4-3-2-A',

    'poker_hand_ranking_list_5'          => '포카드 (Four of a Kind)',
    'poker_hand_ranking_list_5_desc_pc'  => '동일한 값의 카드 네 장으로 이루어진 핸드',
    'poker_hand_ranking_list_5_desc_mb'  => '동일한 값의 카드 네 장으로 이루어진 핸드',

    'poker_hand_ranking_list_6'          => '풀하우스 (Full House)',
    'poker_hand_ranking_list_6_desc_pc'  => '트리플과 원페어를 함께 보유한 핸드',
    'poker_hand_ranking_list_6_desc_mb'  => '트리플과 원페어를 함께 보유한 핸드',

    'poker_hand_ranking_list_7'          => '플러시 (Flush)',
    'poker_hand_ranking_list_7_desc_pc'  => '카드 값과 관계없이 동일한 무늬의 카드 다섯 장으로 이루어진 핸드',
    'poker_hand_ranking_list_7_desc_mb'  => '카드 값과 관계없이 동일한 무늬의 카드 다섯 장으로 이루어진 핸드',

    'poker_hand_ranking_list_8'          => '스트레이트 (Straight)',
    'poker_hand_ranking_list_8_desc_pc'  => '무늬와 관계없이 연속되는 값의 카드 다섯 장으로 이루어진 핸드',
    'poker_hand_ranking_list_8_desc_mb'  => '무늬와 관계없이 연속되는 값의 카드 다섯 장으로 이루어진 핸드',

    'poker_hand_ranking_list_9'          => '가장 높은 스트레이트 -',
    'poker_hand_ranking_list_9_desc_pc'  => 'A-K-Q-J-10',
    'poker_hand_ranking_list_9_desc_mb'  => 'A-K-Q-J-10',

    'poker_hand_ranking_list_10'          => '가장 낮은 스트레이트 -',
    'poker_hand_ranking_list_10_desc_pc'  => '5-4-3-2-A',
    'poker_hand_ranking_list_10_desc_mb'  => '5-4-3-2-A',

    'poker_hand_ranking_list_11'          => '트리플 (Three of a Kind)',
    'poker_hand_ranking_list_11_desc_pc'  => '동일한 값의 카드 세 장으로 이루어진 핸드',
    'poker_hand_ranking_list_11_desc_mb'  => '동일한 값의 카드 세 장으로 이루어진 핸드',

    'poker_hand_ranking_list_12'          => '투페어 (Two Pairs)',
    'poker_hand_ranking_list_12_desc_pc'  => '두 종류의 원페어로 이루어진 핸드',
    'poker_hand_ranking_list_12_desc_mb'  => '두 종류의 원페어로 이루어진 핸드',

    'poker_hand_ranking_list_13'          => '원페어 (Pair)',
    'poker_hand_ranking_list_13_desc_pc'  => '동일한 값의 카드 두 장으로 이루어진 핸드',
    'poker_hand_ranking_list_13_desc_mb'  => '동일한 값의 카드 두 장으로 이루어진 핸드',

    'poker_hand_ranking_list_14'          => '하이 카드 (High Card)',
    'poker_hand_ranking_list_14_desc_pc'  => '중복되는 카드가 없는 경우 가장 높은 값의 싱글 카드',
    'poker_hand_ranking_list_14_desc_mb'  => '중복되는 카드가 없는 경우 가장 높은 값의 싱글 카드',

    'betting_system_round'            => '라운드',
    'betting_system_round_1'          => '1st',
    'betting_system_round_2'          => '2nd',
    'betting_system_round_3'          => '3rd',
    'betting_system_round_4'          => '4th',

    'betting_system_bet'              => '베팅',
    'betting_system_bet_1'            => '안테 베팅 <br> (Ante Bet)',
    'betting_system_bet_2'            => '니탄 보너스 베팅 <br> (Nihtan Bonus Bet)',
    'betting_system_bet_3'            => '보너스 플러스 베팅 <br> (Bonus+ Bet)',
    'betting_system_bet_4'            => '포켓 보너스 베팅 <br> (Pocket Bonus Bet)',
    'betting_system_bet_5'            => '플롭 베팅 <br> (Flop Bet)',
    'betting_system_bet_6'            => '턴 베팅 <br> (Turn Bet)',
    'betting_system_bet_7'            => '리버 베팅 <br> (River Bet)',

    'betting_system_action'           => '액션',
    'betting_system_action_1_pc'      => '플레이어는 홀 카드를 받기 위하여 안테 베팅 영역에 먼저 베팅을 해야합니다.',
    'betting_system_action_1_mb'      => '플레이어는 홀 카드를 받기 위하여 안테 베팅 영역에 먼저 베팅을 해야합니다.',
    'betting_system_action_2_pc'      => '안티 베팅 영역에 베팅을 한 플레이어는 보너스 베팅 영역에 베팅을 할 수 있고 홀 카드에 따라 해당되는 보너스를 획득할 수 있습니다.',
    'betting_system_action_2_mb'      => '안티 베팅 영역에 베팅을 한 플레이어는 보너스 베팅 영역에 베팅을 할 수 있고 홀 카드에 따라 해당되는 보너스를 획득할 수 있습니다.',
    'betting_system_action_3_pc'      => '플레이어의 홀 카드 및 플롭 카드의 보너스 베팅입니다.',
    'betting_system_action_3_mb'      => '플레이어의 홀 카드 및 플롭 카드의 보너스 베팅입니다.',
    'betting_system_action_4_pc'      => '플레이어 홀 카드의 보너스 베팅입니다.',
    'betting_system_action_4_mb'      => '플레이어 홀 카드의 보너스 베팅입니다.',
    'betting_system_action_5_pc'      => '플레이어는 안테 베팅 금액의 두배를 베팅(RAISE/DOUBLE) 하거나 폴드(FOLD)를 선택하여 베팅을 포기할 수 있습니다.',
    'betting_system_action_5_mb'      => '플레이어는 안테 베팅 금액의 두배를 베팅(RAISE/DOUBLE) 하거나 폴드(FOLD)를 선택하여 베팅을 포기할 수 있습니다.',
    'betting_system_action_6_pc'      => '플레이어는 콜(CALL) 또는 체크(CHECK)를 선택할 수 있습니다.',
    'betting_system_action_6_mb'      => '플레이어는 콜(CALL) 또는 체크(CHECK)를 선택할 수 있습니다.',
    'betting_system_action_7_pc'      => '플레이어는 콜(CALL) 또는 체크(CHECK)를 선택할 수 있습니다.',
    'betting_system_action_7_mb'      => '플레이어는 콜(CALL) 또는 체크(CHECK)를 선택할 수 있습니다.',

    'players_whole_card'              => '플레이어의 홀 카드',
    'players_whole_card_1'            => 'A-A',
    'players_whole_card_2'            => 'A-K (동일 무늬)',
    'players_whole_card_3'            => 'A-Q or A-J (동일 무늬)',
    'players_whole_card_4'            => 'A-K (다른 무늬)',
    'players_whole_card_5'            => 'K-K, Q-Q, J-J',
    'players_whole_card_6'            => 'A-Q or A-J (다른 무늬)',
    'players_whole_card_7'            => '2-10 페어',
    'players_whole_card_8'            => '2-K 페어',

    'players_poker_hand'              => '포커의 핸드',
    'players_poker_hand_1'            => '로얄 플러시 <br> (Royal Flush)',
    'players_poker_hand_2'            => '스트레이트 플러시 <br> (Straight Flush)',
    'players_poker_hand_3'            => '포카드 <br> (Four of a Kind)',
    'players_poker_hand_4'            => '풀 하우스 <br> (Full house)',
    'players_poker_hand_5'            => '플러시 <br> Flush',
    'players_poker_hand_6'            => '스트레이트 <br> (Straight)',
    'players_poker_hand_7'            => '트리플 이하 <br> (Three of a Kind or below)',

    'players_hole_cards'              => '플레이어의 홀 카드',
    'players_hole_cards_1'            => 'A 페어',
    'players_hole_cards_2'            => '2~K 페어',

    'payout'                          => '배당률',
    'payout_mb'                       => '배당률',
    'payout_1'                        => '30 : 1',
    'payout_2'                        => '25 : 1',
    'payout_3'                        => '20 : 1',
    'payout_4'                        => '15 : 1',
    'payout_5'                        => '10 : 1',
    'payout_6'                        => '5 : 1',
    'payout_7'                        => '3 : 1',
    'payout_8'                        => '500 : 1',
    'payout_9'                        => '50 : 1',
    'payout_10'                       => '10 : 1',
    'payout_11'                       => '3 : 1',
    'payout_12'                       => '1.5 : 1',
    'payout_13'                       => '1 : 1',
    'payout_14'                       => '패',
    'payout_15'                       => '30 : 1',
    'payout_16'                       => '3 : 1',

    'bad_beat'                        => '배드 비트',
    'bad_beat_1'                      => '-',
    'bad_beat_2'                      => '500 : 1',
    'bad_beat_3'                      => '50 : 1',
    'bad_beat_4'                      => '10 : 1',
    'bad_beat_5'                      => '8: 1',
    'bad_beat_6'                      => '5: 1',
    'bad_beat_7'                      => '패',

    'bonus_plus_desc'                 => '<li><span>‘포커핸드 보너스’ 패를 만들기 위해서는, 플레이어의 핸드에는 반드시 2장의 홀 카드(딜러에게 받은 카드)와 3장의 플롭카드(flop card) 로 구성되어야 합니다.</span></li>
                                          <li><span>‘배드비트 보너스’패를 만들기 위해서는, 플레이어의 핸드는 반드시 딜러에게 ‘스트레이트’ 또는 그보다 더 좋은 패로 져야 합니다. 플레이어의 2장의 홀 카드와 플롭 카드가 플레이어의 핸드를 이뤄야 합니다.</span></li>
                                          <li><span>누가 높은지에 따라 돈을 지불받습니다.</span></li>',

    'bonus_plus_desc_mb'              => '<li><span>‘포커핸드 보너스’ 패를 만들기 위해서는, 플레이어의 핸드에는 반드시 2장의 홀 카드(딜러에게 받은 카드)와 3장의 플롭카드(flop card) 로 구성되어야 합니다.</span></li>
                                          <li><span>‘배드비트 보너스’패를 만들기 위해서는, 플레이어의 핸드는 반드시 딜러에게 ‘스트레이트’ 또는 그보다 더 좋은 패로 져야 합니다. 플레이어의 2장의 홀 카드와 플롭 카드가 플레이어의 핸드를 이뤄야 합니다.</span></li>
                                          <li><span>누가 높은지에 따라 돈을 지불받습니다.</span></li>',

    'bad_beat_img_pc'                 => '<img src="/img/howtoplay/poker/poker_bad_beat.png" class="bad_beat" alt="multibet" />',

    'bad_beat_img_mb'                 => '<img src="/img/howtoplay/poker/poker_bad_beat.png" class="bad_beat" alt="multibet" />',

    'bad_beat_pc'                     => '배드비트는 높은 패를 가진 플레이어가 한 장 혹은 두 장의 럭키 카드를 히트하고 딜러가 예상치 못하게 게임에 건 모든 돈(pot)을 가져가 통계학적으로 이기기 어려운 상대(딜러)에게 졌을 때 받을 수 있습니다.
                                          게임에 지는 플레이어는 “배드비트”라 불리우는 보너스를 얻을 수 있고 위의 표에 근거한 배당을 받습니다. (덧붙이자면, 플레이어들은 보너스+를 얻기 위한 기회에 대한 보험에 돈을 더 걸 가능성이 높습니다.)',

    'bad_beat_mb'                     => '배드비트는 높은 패를 가진 플레이어가 한 장 혹은 두 장의 럭키 카드를 히트하고 딜러가 예상치 못하게 게임에 건 모든 돈(pot)을 가져가 통계학적으로 이기기 어려운 상대(딜러)에게 졌을 때 받을 수 있습니다.
                                          게임에 지는 플레이어는 “배드비트”라 불리우는 보너스를 얻을 수 있고 위의 표에 근거한 배당을 받습니다. (덧붙이자면, 플레이어들은 보너스+를 얻기 위한 기회에 대한 보험에 돈을 더 걸 가능성이 높습니다.)',

    /* pc */
    'ante_bet_payouts_desc_pc'        => '<li> <span> 플레이어가 스트레이트 이상의 핸드로 승리할 경우 안테에 베팅한 만큼의 배당금을 지불받고 그 미만일 경우 베팅금이 플레이어에게 반환됩니다. </span> </li>
                                          <li> <span> 첫번째 단계에서 폴드(Fold)를 선택할 경우 안테 베팅 영역과 보너스 베팅 영역의 베팅금은 반환되지 않습니다. </span> </li>',
    /* mobile */
    'ante_bet_payouts_desc_mb'        => '<li> <span> 플레이어가 스트레이트 이상의 핸드로 승리할 경우 안테에 베팅한 만큼의 배당금을 지불받고 그 미만일 경우 베팅금이 플레이어에게 반환됩니다 </span> </li>
                                          <li> <span> 첫번째 단계에서 폴드(Fold)를 선택할 경우 안테 베팅 영역과 보너스 베팅 영역의 베팅금은 반환되지 않습니다. </span> </li>',
    /* pc */
    'same_hand_ranking_desc_pc'       => '
                                         <p>게임의 결과가 ‘타이(Tie)’일 경우 보너스 베팅 영역을<br/>제외한 모든 베팅 영역의 베팅금이 플레이어에게<br/>반환됩니다.</p>
                                         <p>아래는 ‘타이(Tie)’가 발생할 수 있는 두 가지 상황의<br/>예시입니다.</p>
                                         ',
    /* mobile */
    'same_hand_ranking_desc_mb'       => '
                                         <p>게임의 결과가 ‘타이(Tie)’일 경우 보너스 베팅 영역을 제외한 모든 베팅<br/>영역의 베팅금이 플레이어에게 반환됩니다.</p>
                                         <p>아래는 ‘타이(Tie)’가 발생할 수 있는 두 가지 상황의 예시입니다.</p>
                                         ',

    'same_hand_ranking_dealer'        => '딜러',
    'same_hand_ranking_comcard'       => '커뮤니티 카드',
    'same_hand_ranking_player'        => '플레이어',

    'same_hand_ranking_1'             => '‘플레이 더 보드 (Play the Board)’',
    'same_hand_ranking_1_1_pc'        => '1.1	최고 핸드를 이루는 플레이어와 딜러의 카드가 전부 커뮤니티 카드인 경우',
    'same_hand_ranking_1_1_mb'        => '1.1	최고 핸드를 이루는 플레이어와 딜러의 카드가 전부 커뮤니티<br/>카드인 경우',

    'same_hand_ranking_2_pc'          => '최고 핸드를 이루는 플레이어와 딜러의 한 장 혹은<br/>두 장의 홀 카드가 동일한 경우',
    'same_hand_ranking_2_mb'          => '최고 핸드를 이루는 플레이어와 딜러의 한 장 혹은 두 장의 홀 카드가<br/>동일한 경우',
    'same_hand_ranking_2_1'           => '2.1',
    'same_hand_ranking_2_2'           => '2.2',

    /* ingame tutorial*/

    'multibet'                        => '멀티벳',
    'multibet_img'                    => '<img src="/img/menu/howtoplay/dark/multibet_kr.png", alt="multibet" class="changeImg" />',
    'multibet_desc'                   => '멀티 베팅 패널이 비활성화 사태 일 때는 게임의 기본적인 정보만 표시 됩니다. <img src="/img/menu/howtoplay/preview.png" alt="game statistics" class="multibetimg"/>
                                         를 클릭하여 디테일 정보를 더 얻거나  <img src="/img/menu/howtoplay/go.png" alt="game statistics" class="multibetimg"/> 를 클릭하여 다른 게임으로 옮겨갈 수 있습니다.
                                         <img src="/img/menu/howtoplay/dark/plus_icon.png" alt="game statistics" class="multibetimg changeImg"/> 를 클릭하여 다른 게임의 멀티 베팅을 시작 할 수 있습니다.',

    'multibet_info'                   => '<img src="/img/menu/howtoplay/dark/multibet_active_kr.png" alt="game statistics" class="changeImg multibetinfoimg"/>
                                         <p>활성화 상태일 때는 현재 플레이 중인 은 물론3개의 게임을 추가로 할 수 있습니다. 베팅이 가능한 구역을 클릭하여 손쉽게 베팅할 수 있습니다.
                                         <img src="/img/menu/howtoplay/close.png" alt="game statistics"/> 를 눌러 플레이 중인 게임을 닫거나
                                         <img src="/img/menu/howtoplay/minimize.png" alt="game statistics"/> 를 눌러 멀티벳 판넬을 접어둘 수 있습니다.
                                         </p>',

    'dealer_info_pc'                  => '딜러 정보',
    'dealer_info_mb'                  => '딜러 정보, 채널 및 베팅 한도',
    'dealer_info_img_pc'              => '<img src="/img/menu/howtoplay/dark/pc/dealer_info.png", alt="dealer info" class="changeImg" />',
    'dealer_info_img_mb'              => '<img src="/img/menu/howtoplay/dark/mb/dealer_info.png", alt="dealer info" class="changeImg" />',
    'dealer_info_desc_pc'             => '딜러 명, 게임번호 및 딜러의 승률을 표시합니다.',
    'dealer_info_desc_mb'             => '
                                         <p>딜러 명, 게임번호 및 딜러의 승률을 표시합니다.</p>
                                         <p>채널 번호는 현재 플레이어가<br/>플레이중인 채널과 최소 및 최대<br/>베팅금을 표시합니다.</p>
                                         ',

    'table_bet_range'                 => '',
    'table_bet_range_desc'            => '',

    'game_statistics'                 => '게임 통계',
    'game_statistics_img_pc'          => '<img src="/img/menu/howtoplay/dark/pc/stats_kr.png" width="100%" alt="game stats" class="roadmap changeImg" />',
    'game_statistics_img_mb'          => '<img src="/img/menu/howtoplay/dark/mb/stats.png" width="100%" alt="game stats" class="roadmap changeImg" />',
    'game_statistics_desc_pc'         => '게임 기록의 비드 플레이트, 마지막 3개 게임의 결과를<br/>표시합니다. 매 게임 이후 업데이트되며 딜러 변경 시<br/>초기화됩니다.',
    'game_statistics_desc_mb'         => '비드 플레이트에 게임 기록을 표시합니다. 매 게임 이후 업데이트되며, 딜러 변경 시 초기화 됩니다.',

    'bonus_payouts'                   => '보너스 배당',
    'bonus_payouts_img_pc'            => '<img src="/img/menu/howtoplay/dark/pc/payouts_kr.png", alt="bonus payouts" class="pay changeImg" />',
    'bonus_payouts_img_mb'            => '<img src="/img/menu/howtoplay/dark/mb/payouts_kr.png", alt="bonus payouts" class="pay changeImg" />',
    'bonus_payouts_desc_pc'           => '플레이어 홀 카드의 보너스 배당 정보를 표시합니다.',
    'bonus_payouts_desc_mb'           => '플레이어 홀 카드의 보너스 배당<br/>정보를 표시합니다.',

    'player_info'                     => '플레이어 정보',
    'player_info_img_pc'              => '<img src="/img/menu/howtoplay/dark/pc/player_info_kr.png", alt="game player info" class="changeImg" />',
    'player_info_img_mb'              => '<img src="/img/menu/howtoplay/dark/mb/player_info_kr.png", alt="game player info" class="changeImg" />',
    'player_info_desc_pc'             => '플레이어의 아바타, 아이디 및 승/패를 표시합니다.<br/>아바타는 로비의 설정에서<br/>변경할 수 있습니다.',
    'player_info_desc_mb'             => '플레이어의 아바타, 아이디 및 승/패를 표시합니다. 아바타는<br/>로비의 설정에서 변경 할 수<br/>있습니다.',

    'bet_info'                        => '베팅 금액 정보',
    'bet_info_img_pc'                 => '<img src="/img/menu/howtoplay/dark/pc/bet_info_kr.png", alt="game bet info" class="changeImg" />',
    'bet_info_img_mb'                 => '<img src="/img/menu/howtoplay/dark/mb/bet_info_kr.png", alt="game bet info" class="changeImg" />',
    'bet_info_desc_pc'                => '플레이어의 보유금과 해당 라운드의 총 베팅금 및<br/>당첨금을 표시합니다.',
    'bet_info_desc_mb'                => '플레이어의 보유금과 해당 라운드의 총 베팅금 및 당첨금을 표시합니다.',

    'channels_bet_limit'              => '채널과 베팅 한도',
    'channels_bet_limit_img'          => '<img src="/img/menu/howtoplay/dark/pc/channels_kr.png" alt="channels" class="changeImg" />',
    'channels_bet_limit_desc'         => '채널 번호는 현재<br/>플레이어가 플레이중인<br/>채널과 최소 및 최대<br/>베팅금을 표시합니다.',

    'card_display'                    => '카드 표시',
    'card_dealer'                     => '딜러카드',
    'card_player'                     => '플레이어카드',
    'card_community_cards'            => '커뮤니티 카드',

    'card_display_desc_pc'            => '게임 진행 시 화면의 로드맵이 카드 표시창으로 전환되며<br/>플레이어, 딜러 및 커뮤니티 카드가 표시됩니다. 딜러 카드는<br/>리버 카드가 오픈된 뒤에 공개됩니다.',
    'card_display_desc_mb'            => '게임 진행 시 화면의 로드맵이 카드 표시창으로 전환되며 플레이어, 딜러 및 커뮤니티 카드가 표시됩니다. 딜러 카드는 리버 카드가 오픈된 뒤에<br/>공개됩니다.',

    'betting_buttons'                 => '베팅 버튼과 타이머',
    'betting_buttons_desc_pc'         => '
                                         <p>화면 중앙에 실행 취소, 베팅 확인 및 베팅 취소 버튼을 표시합니다. 베팅에 주어지는 시간은 총 20초이며 마지막 10초 카운트 다운에는 타이머가 점점 붉게 표시됩니다.</p>

                                         <img src="/img/menu/howtoplay/dark/pc/betting_buttons_kr.png" class="betting-btn" alt="betting buttons" />

                                         <p>이전 베팅과 동일하게 베팅을 하고자하는 경우 <img src="/img/menu/howtoplay/dark/undo_btn_kr.png" width="55px" alt="undo" /> 버튼이 변경된 자리의 <img src="/img/menu/howtoplay/dark/repeat_btn_kr.png" width="55px" alt="repeat"/>
                                         지난 베팅을 반복 베팅할 수 있습니다.
                                         </p>',
    'betting_buttons_desc_mb'         => '
                                         <p>실행 취소, 베팅 확인 및 베팅 취소 버튼을 표시합니다. 베팅에 주어지는<br/>시간은 총 20초이며 마지막 10초 카운트 다운에는 타이머가 점점 붉게 표시됩니다.</p>

                                         <img src="/img/menu/howtoplay/dark/mb/betting_buttons_kr.png" class="betting-btn" alt="betting buttons" />

                                         <p>이전 베팅과 동일하게 베팅을 하고자하는 경우<img src="/img/menu/howtoplay/dark/undo_btn_kr.png" alt="undo" /> 버튼이 변경된 자리의<img src="/img/menu/howtoplay/dark/repeat_btn_kr.png" alt="repeat"/>
                                         버튼을 터치하여 지난 베팅을 반복 베팅할 수 있습니다.
                                         </p>',

    'chips_rack'                      => '칩 세팅',
    'chips_rack_desc'                 => '기본 칩 또는 플레이어가 선택한 칩이 표시됩니다.',
    'chips_rack_img_pc'               => '<img src="/img/menu/howtoplay/dark/pc/chip_rack_kr.png" alt="modify chips" class="chip racks">',
    'chips_rack_img_mb'               => '<img src="/img/menu/howtoplay/dark/mb/chip_rack_kr.png" alt="modify chips" class="chip racks">',

    'menu_toggle'                     => '메뉴 버튼',
    'menu_toggle_desc'                => '<img src="/img/menu/howtoplay/dark/mb/menu_toggle.png" width="7%" alt="menu toggle" class="menu_toggle"> 버튼을 터치하면 전체 메뉴창이 표시됩니다.',

    'modify_chips'                    => '사용자 칩 설정',
    'modify_chips_desc_pc'            => '
                                         <p>설정된 칩을 변경하고자 하는 경우 게임 메뉴의 <img src="/img/menu/howtoplay/dark/pc/modifychips_btn_kr.jpg" width="50px" alt="modify chips" class="changeImg" /> 버튼을 클릭하여 칩을 교체할 수 있습니다.
                                         상단의 칩 세팅에서<br/>교체하고자 하는 칩을 먼저 클릭하여 제거한 뒤 하단의 칩을<br/>선택하고 <img src="/img/menu/howtoplay/dark/applychips_btn_kr.jpg" width="15%" alt="apply" /> 버튼을 클릭하면 적용됩니다.
                                         <br/><img src="/img/menu/howtoplay/dark/clearchips_btn_kr.png" width="15%" alt="clear" class="changeImg" /> 버튼을 클릭하면 기본 설정 칩으로 변경됩니다.</p>
                                         ',
    'modify_chips_desc_mb'            => '
                                         <p>설정된 칩을 변경하고자 하는 경우 게임 메뉴의 <img src="/img/menu/howtoplay/dark/mb/modifychips_btn.png" width="7%" alt="modify chips" class="changeImg" /> 버튼을 터치하여 칩을 교체할 수 있습니다. 상단의 칩 세팅에서 교체하고자 하는 칩을 먼저<br/>터치하여 제거한 뒤 하단의 칩을 선택하고 <img src="/img/menu/howtoplay/dark/applychips_btn_kr.jpg" width="12%" alt="apply" /> 버튼을 터치하면<br/>적용됩니다. <img src="/img/menu/howtoplay/dark/clearchips_btn_kr.png" width="12%" alt="clear" class="changeImg" /> 버튼을 터치하면 기본 설정 칩으로 변경됩니다. </p>
                                           ',
    'modify_chips_img_pc'             => '<img src="/img/menu/howtoplay/dark/pc/modify_chips_kr.png" alt="modify chips" class="modify_chip changeImg">',
    'modify_chips_img_mb'             => '<img src="/img/menu/howtoplay/dark/mb/modify_chips_kr.png" alt="modify chips" class="modify_chip changeImg">',

];

?>
