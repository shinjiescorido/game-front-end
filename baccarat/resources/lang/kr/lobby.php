<?php

/* KOREAN */

return [
    'table'                 => '테이블',
    'maintenance'           => '점검을 실시하고 있습니다.',
    'dealing'               => '딜',
    'placebets'             => '베팅시작',
    'showingresult'        => '결과 확인',
    'timerpaused'            => 'Timer Paused',
    'timerstopped'          => 'Timer Stopped',
    'timerresumed'          => 'Timer Resumed',
    'flopdecision'          => '플롭 선택',
    'turndecision'          => 'Turn Decision',
    'riverdecision'         => '리버 선택',
    'roundnumber'           => '게임 아이디',
    'dealer_allcaps'        => '딜러',
    'player_allcaps'        => '플레이어',
    'dealer'                => '딜러',
    'community'             => '커뮤니티 카드',
    'player'                => '플레이어',
    'result'                => '결과',
    'betrange'              => '입장하기', //'베팅 범위',
    'room'                  => '룸',
    'sorry'                  => '죄송합니다.',
    'closedfor'                  => '서비스 향상을 위해',
    'oops_maintenance'          => '점검을 실시하고 있습니다.',
    'comeback'                  => '다음 기회에 이용해 주십시오.',
    'to'                  => '~',
    
    /**transfer logs/histtory**/

    'transfer-history'     => '니탄 전환로그',
    'transfer-type'     => '분류',
    'transfer-oldcredit'    => '이전보유금',
    'transfer-transferamount'    => '사용금액',
    'transfer-newcredit'    => '최종 보유금',
    'transfer-country'    => '접속 국가',
    'transfer-ip'    => 'IP',
    'transfer-date'    => '처리시간',


    /**poker rules new **/
    'title' => '포커 (poker)',
    'title2' => '게임 개요 ',
    'content1' => '니탄 포커는 온라인을 통해 딜러와 플레이어가 겨루는 헤드업 게임으로, 텍사스 홀덤의 운영 방식을 채용하였습니다. ',
    'content1-5' => '2장의 홀 카드와 공용의 커뮤니티 카드를 조합해 5장의 핸드를 만들고, 높은 랭킹의 핸드를 보유한 사람이 승리하여, 팟 안의 베팅 금액을 모두 획득합니다.<br/><br/>
    <strong> 포커의 카드 서열 (높은 순에서 낮은 순)</strong><br> <p>A는 가장 높은 서열, 2는 가장 낮은 서열로 간주되며 랭킹의 서열은 다음과 같습니다.
A-K-Q-J-10-9-8-7-6-5-4-3-2</p>',

    'title3' =>'포커의 핸드 랭킹',
    'numbered_content' => '1.   <strong>로얄 플러쉬</strong> (Royal Flush) - 같은 무늬의 10, J, Q, K, A로 이루어진 핸드<br/>
    <img src="/img/rules/updated/royalflush_img.png"><br/>
        2.  <strong>스트레이트 플러쉬</strong> (Straight Flush) - 같은 무늬와 연속되는 숫자로 이루어진 핸드<br/>
            <p class="sub-rule">a) 가장 높은 스트레이트 플러쉬 : K-Q-J-10-9 (모두 같은 무늬의 카드)</p>
                <img src="/img/rules/updated/straightflush_A_img.png"><br/>
            <p class="sub-rule">b) 가장 낮은 스트레이트 플러쉬 : 6-5-4-3-2 (모두 같은 무늬의 카드)</p>
                <img src="/img/rules/updated/straightflush_B_img.png"><br/>
            <p class="sub-rule"><b>참고 : 같은 무늬의 A-2-3-4-5 의 카드를 보유한 경우, A는 2, 3, 4, 5와 연속되는 숫자로 인정되지 않아 스트레이트 플러쉬가 아닌 플러쉬로 간주됩니다.</b></p>
        3.  <strong>포 카드 </strong>(Four of a Kind) - 같은 랭크로 된 네 장의 카드를 보유한 경우<br/>
            <img src="/img/rules/updated/4kind_img.png"><br/>
        4.  <strong>풀 하우스</strong> (Full House) - 트리플과 원 페어를 보유한 경우<br/>
            <img src="/img/rules/updated/fullhouse_img.png"><br/>
        5.  <strong>플러쉬</strong> (Flush) - 랭크와 상관없이 같은 무늬 5장으로 이루어진 핸드<br/>
                <img src="/img/rules/updated/flush_img.png"><br/>
        6.  <strong>스트레이트</strong> (Straight) - 무늬와 상관없이 연속되는 랭크 5장으로 이루어진 핸드<br/>
            <p class="sub-rule">a) 가장 높은 스트레이트 : A-K-Q-J-10 (다른 무늬의 카드)</p>
                <img src="/img/rules/updated/higheset_straight.png"><br/>
            <p class="sub-rule">b) 가장 낮은 스트레이트 : 6-5-4-3-2 (다른 무늬의 카드)</p>
                <img src="/img/rules/updated/lowest_straight.png"><br/>
            <p class="sub-rule"><b>참고 : 다른 무늬의 A-2-3-4-5 카드를 보유한 경우, A는 2, 3, 4, 5와 연속되는 숫자로 인정되지 않아 스트레이트가 아닌 하이카드로 간주됩니다</b></p>
        7.  <strong>쓰리 카드</strong> (Three of a Kind) - 같은 랭크의 카드를 세 장 보유한 경우<br/>
                <img src="/img/rules/updated/3kind_img.png"><br/>
        8.  <strong>투 페어</strong> (Two Pairs) - 두 종류의 페어를 보유한 경우<br/>
                <img src="/img/rules/updated/2pairs_img.png"><br/>
        9.  <strong>원 페어</strong> (Pair) - 같은 랭크의 카드를 두 장 보유한 경우<br/>
                <img src="/img/rules/updated/pair_img.png"><br/>
        10.  <strong>하이 카드</strong> (High Card) - 중복되는 랭크의 카드가 없는 경우, 가장 높은 순위의 싱글 카드<br/>
                <img src="/img/rules/updated/high_img.png"><br/>',

    'title4' => '베팅 시스템',
    'p_table_1_thead_1' => '라운드',
    'p_table_1_thead_2' => '베팅',
    'p_table_1_thead_3' => '액션',
    'table_ante_bet' => '앤티 (Ante Bet)',
    'table_bonus_bet' => '보너스 베팅 (Bonus Bet)',
    'table_flop_bet' => '플롭 (Flop Bet)',
    'table_turn_bet' => '턴 (Turn Bet)',
    'table_river_bet' => '리버 (River Bet)',
    'ante_desc' => '플레이어는 홀 카드를 받기 전에 앤티 금액을 베팅합니다. ',
    'bonus_desc' => '앤티를 베팅한 플레이어만이 보너스에 해당하는 각 항목에 베팅할 수 있습니다.',
    'flop_desc' => '플레이어는 레이즈(RAISE) 또는 폴드(FOLD)를 선택',
    'turn_desc' => '플레이어는 콜(CALL) 또는 체크(CHECK)를 선택',
    'river_desc' => '플레이어는 콜(CALL) 또는 체크(CHECK)를 선택',

    'title5' => '보너스 베팅의 배당률',
    'table_content1' => '플레이어의 홀 카드',
    'table_content2' => '배당률',
    'table_content3' => 'A-A',
    'table_content4' => 'A-K (같은 무늬)',
    'table_content5' => 'A-Q or A-J (같은 무늬)',
    'table_content6' => 'A-K (무늬는 무관)',
    'table_content7' => 'K-K, Q-Q, J-J',
    'table_content8' => 'A-Q or A-J (무늬는 무관)',
    'table_content9' => 'Any Pair 2-10',

    'title6'    => '앤티 베팅의 배당률',
    'bullet-content'    => '• 만약 스트레이트 이상의 핸드를 보유할 경우 1:1의 배당율로 앤티 금액을 획득하고, 그 이하의 핸드일 경우에는 반환되지 않습니다. <br/>
• 만약 첫번째 라운드에서 폴드(fold)하게 되면, 앤티와 보너스 베팅은 소멸됩니다.',

    'title7' => '무늬의 서열',
    'title8' => '동일한 핸드의 랭킹 (TIE)',

    'content8' => '플레이어와 딜러가 동일한 랭크의 핸드를 보유했을 경우에는 높은 숫자를 가진 쪽이 승리합니다. <br/>

만약 플레이어와 딜러가 같은 숫자의 홀 카드를 보유하고 있다면, 무늬의 서열을 따져 승부를 가립니다. 다음의 세 가지 상황을 참조해 주십시오.',
    'title9' => '1. 한 장의 홀 카드가 핸드에 포함될 경우',

    'title10' => '1.    한 장의 홀 카드가 핸드에 포함될 경우',
    'content10' => '1.1. 남아 있는 홀 카드(키커)의 숫자를 비교하여 높은 쪽이 승리합니다.',
    'content10-dealer' => '딜러 (6번째 카드로 승리)',
    'content10-player' => '플레이어',
    'content10-1' => '1.2. 남아 있는 홀 카드도 서로 같은 숫자일 경우, 무늬의 서열에 따라 승부를 가립니다.',
    'content10-1-dealer' => '딜러',
    'content10-1-player' => '플레이어 (6번째 카드로 승리)',

    'title11' => '2. 두 장의 홀 카드가 핸드에 포함될 경우',
    'content11' => '2.1. 홀 카드 중에서 가장 높은 숫자의 카드를 비교합니다.<br/> 
가장 높은 숫자가 서로 동일할 경우, 나머지 홀 카드의 숫자로 승부를 가립니다.',
    'content11-dealer' => '딜러 (5번째 카드로 승리)',
    'content11-player' => '플레이어',

    'content11-1' => '2.2. 딜러와 플레이어의 홀 카드가 모두 동일한 숫자일 경우, 무늬의 서열로 승부를 가립니다.',

    'title12' => '3.  홀 카드가 핸드에 포함되지 않는 경우',
    'content12' => '3.1. 홀 카드 중에서 가장 높은 숫자의 카드로 승부를 겨룹니다. ',
    'content12-1' => '3.2. 가장 높은 숫자가 서로 동일할 경우, 나머지 홀 카드의 숫자로 승부를 가립니다. ',

    'content12-1-dealer' => '딜러 (7번째 카드로 승리)',
    'content12-1-player' => '플레이어',

    'content12-2-dealer' => '딜러',
    'content12-2-player' => '플레이어 (7번째 카드로 승리)',

    'content12-2' => '3.3. 나머지 홀 카드의 숫자도 서로 동일할 경우, 그 카드 무늬의 서열로 승부를 가립니다.',

    'table_closed_maintenance' => '지금은 서비스 이용시간이 아닙니다.',
    'general_maintenance' => '지금은 서비스 시스템 업데이트시간입니다.',
    'emergency_maintenance' => '서비스 긴급 점검중입니다.',

    'maintenance_sorry' => '죄송합니다.',

    'table_is_open' => '서비스 이용시간',
    'general_open' => '정기 점검시간',
    'emergency_open' => '긴급 점검 완료 예정시간',

    'weekly_maintenance' => '서비스 품질을 향상시키고 있습니다!', //'지금은 서비스 정기 점검시간입니다.',
    'weekly_table_open' => '정기 점검시간',

    'weekday_0' => '일',
    'weekday_1' => '월',
    'weekday_2' => '화',
    'weekday_3' => '수',
    'weekday_4' => '목',
    'weekday_5' => '금',
    'weekday_6' => '토',

    'general_message_1' => '조금 뒤에 찾아뵙겠습니다!',
    'general_message_2' => '테이블 게임 서비스 시간',
    
    'weekly_message_1' => '서비스 품질을 향상시키고 있습니다!',
    'weekly_message_2' => '정기점검은 매주 월요일 입니다!',//'정기 점검시간입니다.',
    'weekly_time_text' => '매주 x요일',
    'every_monday_text' => '완료 시간 ',//'매주 월요일',

    'emergency_text_1' => '불편을 끼쳐 죄송합니다.',
    'emergency_text_2' => '서비스 긴급 점검중입니다.',
    'emergency_text_3' => '긴급 점검 완료 예정시간',

    'system_update_text_1' => '잠시만 기다려주십시오.',
    'system_update_text_2' => '시스템을 업데이트하고 있습니다.',
    'system_update_text_3' => '업데이트 완료 예정 시간',

    'yourbet' => '베팅 금액',
    'gameresult'=> '결과',
    'winningresult' =>'베팅 내역',
    'gameid'=> '게임 번호',

    //baccarat

    'player_b' => '플레이어 카드',
    'banker' => '뱅커 카드',
    //sicbo
    'diceresult' => '주사위 결과',
    
    //poker
    'winninghandrank' => '카드 결과',
    'dealercards' => '딜러 카드',
    'communitycards' => '공용 카드',
    'playercards' => '플레이어 카드',

    /**baccarat game rules **/
    'b_howto'   => '바카라 게임 방법',
    'b_title_1'   => '게임 개요',
    'b_content_1' => '바카라는 뱅커와 플레이어 중 어느 쪽이9에 가까운 숫자를 획득하느냐를 맞추는 게임입니다. 
바카라 전용의 테이블 위에서 진행되며, 한 팩에 52장으로 구성된 카드 8팩을 사용합니다.',
    'b_title_2'     =>  '카드 값의 계산',
    'b_content_2'   => '에이스는 1로 계산<br>K, Q, J, 10은 0으로 계산<br>숫자 9, 8, 7, 6, 5, 4, 3, 2는 각 카드의 액면가로 계산',
    'b_title_3'     =>  '테이블 종류',

    'b_table_type_1'    => '<strong>CLASSIC - </strong>한 사람의 유저가 참여하는 테이블입니다.',
    'b_table_type_2'    => '<strong>FLIPPY TABLE - </strong>클래식 게임의 한 종류로, 유저는 정해진 시간 안에 자신의 카드를 직접 오픈 할 수 있습니다.',
    'b_table_type_3'    => '<strong>MULTI PLAYER - </strong>7명까지 동시 진행이 가능한 테이블입니다.',
    'b_content_list'   => '<ul><li>유저가 "플레이어 (player)", "뱅커 (banker)", "무승부 (tie)" 또는"플레이어 페어 (player pair) "나 "뱅커 페어 (banker pair) "에 베팅을 하면 게임이 시작됩니다. 베팅 제한 시간은 20초입니다. </li>
    <li>베팅이 완료되면 딜러는 플레이어와 뱅커 측에 각기 두 장의 카드를 내려놓습니다. </li>
    <li>두 장의 카드를 오픈한 뒤 9에 가까운 쪽이 승리합니다. 합이 8 또는 9일 경우를 "내추럴 (NATURAL)"이라고 합니다. </li>
    <li>바카라에서는 카드의 합이 9를 초과할 수 없습니다. 만약 카드의 합이 10 이상일 경우에는 끝자릿수의 숫자로 승부를 겨룹니다. (예를 들어 합이 15인 경우 값은5).</li></ul>',

    'b_title_4' => '3번째 카드 뽑기',
    'b_content_4' => '<p>만약 플레이어나 뱅커 중 한쪽의 카드의 합이 8 또는 9가 될 경우에는 세번째 카드를 받지 않는 스탠드 상태가 됩니다. 자세한 내용은 다음 룰을 참고하여 주십시오.</p> <p>세번째 카드를 뽑는 경우는 히트, 뽑지 않는 경우를 스탠드라고 합니다.</p>',
    
    'b_title_5' => '플레이어의 카드',
    'b_content_5' => '<table class="table table-bordered">
        <tr>
            <td>두 카드의 합</td><td>액션</td>
        </tr>
        <tr>
            <td>0-5</td><td>히트</td>
        </tr>
        <tr>
            <td>6-7</td><td>스탠드</td>
        </tr>
        <tr>
            <td>8-9</td><td>내추럴, 스탠드</td>
        </tr>
    </table>',
    'b_title_6' => '뱅커의 카드',
    'b_content_6' => '<table class="table table-bordered">
        <tr>
            <td>두 카드의 합</td><td colspan="2">플레이어의 세번째 카드</td>
        </tr>
        <tr>
            <td>3</td><td>0-7 그리고 9 : 히트</td><td>8 : 스탠드</td>
        </tr>
        <tr>
            <td>4</td><td>2-7 : 히트</td><td>0-1 그리고 8-9 : 스탠드</td>
        </tr>
        <tr>
            <td>5</td><td>4-7 : 히트</td><td>0-3 그리고 8-9 : 스탠드</td>
        </tr>
        <tr>
            <td>6</td><td>6-7 : 히트</td><td>0-5 그리고 8-9 : 스탠드</td>
        </tr>
        <tr>
            <td>7</td><td colspan="2">스탠드</td>
        </tr>
        <tr>
            <td>8-9</td><td colspan="2">내추럴, 스탠드</td>
        </tr>
        <tr>
            <td>0-2</td><td colspan="2">히트</td>
        </tr>
    </table>',
    'b_title_7' => '뱅커의 카드',
    'b_content_7' => '<table class="table table-bordered">
        <tr>
            <td>베팅 구역</td><td>배당률</td>
        </tr>
            <td>플레이어</td><td>1:1</td>
        </tr>
        <tr>
            <td>뱅커</td><td>0.95:1</td>
        </tr>
        <tr>
            <td>타이</td><td>8:1</td>
        </tr>
        <tr>
            <td>플레이어 페어</td><td>11:1</td>
        </tr>
            <td>뱅커 페어</td><td>11:1</td>
        </tr>
    </table>',
    'b_title_8' => '카드의 포지션',
    'b_title_9' => 'Flippy Table (유저가 카드를 오픈할 수 있는 바카라 테이블)',
    'b_content_9' => '<table class="table table-bordered">
        <tr>
            <td>액션</td><td>제한 시간</td>
        </tr>
            <td>플레이어 & 딜러의 카드 오픈</td><td>10 seconds</td>
        </tr>
        <tr>
            <td>세번째 카드 오픈</td><td>13 seconds</td>
        </tr>
    </table>'


];
