<?php

/* ENGLISH */

return [
    'game_objective'              => 'レッド&ホワイトのゲームルール',
    'gameplay'                    => 'ゲームの流れ',
    'types_of_bet'                => 'ベットの種類',


    /** DESKTOP CONTENTS **/

    // game objective
    'gameobj_desc'                => '<h4>レッド&ホワイトのゲームルール</h4>
                                    <p>このゲームの正式名称は、“Pula-Puti(プラプチ)”と呼びます。100マス目:レッド49マス (<img src="/img/howtoplay/redwhite/red_square.png" alt="white" />) ホワイト (<img src="/img/howtoplay/redwhite/white_square.png" alt="red" />) 49マス 泥炭シンボルマーク (<img src="/img/howtoplay/redwhite/nihtan_symbol.png" alt="Nihtan" />) (レッド、ホワイト各1マス)のチェッカーボードを使用します。漏斗状の容器に向って,ピンポン玉3個を投げ入れどのマス目に落ちるかを予想するゲームです。</p>',

    // gameplay list
    'gameplay_list'               => '<li>3個のピンポン玉が漏斗状の容器に向って投げ入れられます。</li>
                                      <li>2個以上のピンポン玉が乗った色(レッド or ホワイト)の勝利となります。</li>
                                      <li>ピンポン玉が1個でも、泥炭シンボルマーク (<img src="/img/howtoplay/redwhite/nihtan_symbol.png" alt="Nihtan" />) に乗った場合、レッド・ホワイトベットは回収となります。</li>',

    // type of bets
    'bet'                         => 'ベット',
    'payout'                      => '配当率',

    'bet_1'                       => '2 Red (ピンポン玉が2個以上赤に落ちる)',
    'bet_2'                       => '2 White (ピンポン玉が2個以上白に落ちる)',
    'bet_3'                       => '3 Red (ピンポン玉が3個とも赤に落ちる)',
    'bet_4'                       => '3 White (ピンポン玉が3個とも白に落ちる)',
    'bet_5'                       => '1ボーナス (<img src="/img/howtoplay/redwhite/nihtan_symbol.png" alt="Nihtan" />)',
    'bet_6'                       => '2ボーナス (<img src="/img/howtoplay/redwhite/nihtan_symbol.png" alt="Nihtan" /><img src="/img/howtoplay/redwhite/nihtan_symbol.png" alt="Nihtan" />)',

    'payout_1_1'                  => '1 : 1',
    'payout_7_1'                  => '7 : 1',
    'payout_15_1'                 => '15 : 1',
    'payout_250_1'                => '250 : 1',

    'advanced_bet_panel_title'    => 'ベット予約パネル',
    'advanced_bet_panel_desc1'    => '32ゲーム分のベットを予約できます。',
    'advanced_bet_panel_list'     => '<li><span>最大32ゲーム分のベットを予約できます。</span></li>
                                      <li><span>カスタム</span></li>
                                      <li><span>奇数</span></li>
                                      <li><span>偶数</span></li>
                                      <li><span>予約ベットのお知らせ表示</span></li>
                                      <li><span>ラウンド数の選択</span></li>
                                      <li><span>ラウンドパネル</span></li>',
    'advanced_bet_panel_desc2'    => '<img src="/img/menu/howtoplay/tutorials/min_custom_btn.png" alt="custom" />
                                 を選択すると予約をするラウンド番号を選べます。<img src="/img/menu/howtoplay/tutorials/min_odd_btn.png" alt="odd" /> (奇数)を選択すると奇数ラウンド番号のみ選択できます。<img src="/img/menu/howtoplay/tutorials/min_even_btn.png" alt="even" /> (偶数)を選択すると偶数ラウンドのみ選択できます。',
    'advanced_bet_panel_title'    => '予約ベットボード',
    'advanced_bet_board_desc1'    => '選択した、予約ベットを表示します。
                                  <img src="/img/menu/howtoplay/tutorials/min_confirm_btn.png" alt="check" /> をクリックで｢ベット確認｣ <img src="/img/menu/howtoplay/tutorials/min_clear_btn.png" alt="clear" /> をクリックするとベットを｢キャンセル｣できます。',
    'dealerinfo_title'            => 'ディーラー情報',
    'dealerinfo_desc'             => "現在のラウンドのディーラー名及び直近の結果を表示します。",
    'gamestatistics_title'        => '統計',
    'gamestatistics_desc1'        => '直近の150ゲームのゲーム結果を表示します。毎ゲーム、
                                    赤/白・1泥炭/2泥炭の勝率が表示されます。ディーラーの交代時にリセットされます。',

    'livebets_statsbutton_title'  => 'ライブベット/スタッツボタン',
    'livebets_statsbutton_desc'   => '<img src="/img/menu/howtoplay/tutorials/min_livebets_btn.png" alt="live bets" />
                                  をクリックすると他プレイヤーがどこにベットしているかをパーセンテージで表示します。<img src="/img/menu/howtoplay/tutorials/min_stats_btn.png" alt="stats" /> をクリックすると自分の統計表示に戻ります。',

    'autobetbutton_title'         => 'オートベットボタン',
    'autobetbutton_desc'          => '<img src="/img/menu/howtoplay/tutorials/autobetbtn.png" alt="auto" />
                                    オートベットボタンをクリックすると5回、10回、15回　同じベットを自動的に繰り返すことができます。',

    'playerinfo_title'            => 'プレイヤー情報',
    'playerinfo_desc'             => '現在ゲームに参加しているプレイヤー
                                    の情報を表示します。勝敗の統計が確認できます。
                                    アバターはゲームロビーで変更できます。',

    'betinfo_title'               => 'ベット情報',
    'betinfo_desc'                => '泥炭残高及び、総ベット額、配当金額を表示します。',
    'channels_and_limit_title'    => 'テーブルとベット限度額',
    'channels_and_limit_desc'     => '現在ゲームしているテーブル番号及び、最低-最高ベット額を表示します。',

    'betting_buttons_timer_title' => 'ベット確定ボタンと制限時間',
    'betting_buttons_timer_desc'  => '<p>｢確定｣ボタンをクリックすると現在のベットが確定されます。
                                    ｢再ベット｣をクリックすると直前のゲームと同じベットがされます。｢キャンセル｣ボタンはベットボードの上の全てのベットをキャンセルできます。制限時間30秒で、確定ボタンの周りにタイマーが表示されます。制限時間残り10秒になると、タイマーがオレンジ色に変わります。</p>

                                    <img src="/img/menu/howtoplay/tutorials/betting_buttons.png" class="betting-btn" alt="betting buttons" />

                                    <p>Tオートベットを使用している場合は、残りのベット回数を表示します。</p>',

    'chips_rack_title'            => 'チップセット',
    'chips_rack_desc'             => '画面右下に表示されるチップトレイです。
                                    メニューのチップの変更からお好みのチップセットにカスタマイズすることができます。',
    'modify_chips_title'          => 'チップの変更',
    'modify_chips_desc'           => 'チップセットをカスタマイズできます。メニューにある
                                    <img src="/img/menu/howtoplay/tutorials/min_modifychips_btn_jp.png" alt="modify chips" /> のアイコンをクリックし お好みのチップをクリックし選択した後、入れ替えたいチップをクリックし<img src="/img/menu/howtoplay/tutorials/min_applychips_btn_jp.png" alt="apply chips" /> のボタンをクリックしてください。<img src="/img/menu/howtoplay/tutorials/min_clearchips_btn_jp.png" alt="clear chips" /> こちらのボタンを押すと現在のセットがリセットされます',
    'modify_chips_img'            => '<img src="/img/menu/howtoplay/tutorials/modify_chips_jp.png" alt="modify chips" class="modifychips" />',


    /** MOBILE CONTENTS **/

    // game objective
    'gameobj_desc_mb'                => '<h4>レッド&ホワイトのゲームルール</h4>
                                    <p>このゲームの正式名称は、“Pula-Puti(プラプチ)”と呼びます。100マス目:レッド49マス (<img src="/img/howtoplay/redwhite/red_square.png" alt="white" />) ホワイト (<img src="/img/howtoplay/redwhite/white_square.png" alt="red" />) 49マス 泥炭シンボルマーク (<img src="/img/howtoplay/redwhite/nihtan_symbol.png" alt="Nihtan" />) (レッド、ホワイト各1マス)のチェッカーボードを使用します。漏斗状の容器に向って,ピンポン玉3個を投げ入れどのマス目に落ちるかを予想するゲームです。</p>',

    // gameplay list
    'gameplay_list_mb'               => '<li>3個のピンポン玉が漏斗状の容器に向って投げ入れられます。</li>
                                      <li>2個以上のピンポン玉が乗った色(レッド or ホワイト)の勝利となります。</li>
                                      <li>ピンポン玉が1個でも、泥炭シンボルマーク (<img src="/img/howtoplay/redwhite/nihtan_symbol.png" alt="Nihtan" />) に乗った場合、レッド・ホワイトベットは回収となります。</li>',

    // type of bets
    'bet_mb'                         => 'ベット',
    'payout_mb'                      => '配当率',

    'bet_1_mb'                       => '2 Red (ピンポン玉が2個以上赤に落ちる)',
    'bet_2_mb'                       => '2 White (ピンポン玉が2個以上白に落ちる)',
    'bet_3_mb'                       => '3 Red (ピンポン玉が3個とも赤に落ちる)',
    'bet_4_mb'                       => '3 White (ピンポン玉が3個とも白に落ちる)',
    'bet_5_mb'                       => '1ボーナス (<img src="/img/howtoplay/redwhite/nihtan_symbol.png" alt="Nihtan" />)',
    'bet_6_mb'                       => '2ボーナス (<img src="/img/howtoplay/redwhite/nihtan_symbol.png" alt="Nihtan" /><img src="/img/howtoplay/redwhite/nihtan_symbol.png" alt="Nihtan" />)',

    'payout_1_1_mb'                  => '1 : 1',
    'payout_7_1_mb'                  => '7 : 1',
    'payout_15_1_mb'                 => '15 : 1',
    'payout_250_1_mb'                => '250 : 1',

    'advanced_bet_panel_title_mb'    => 'ベット予約パネル',
    'advanced_bet_panel_desc1_mb'    => '32ゲーム分のベットを予約できます。',
    'advanced_bet_panel_list_mb'     => '<li><span>最大32ゲーム分のベットを予約できます。</span></li>
                                      <li><span>カスタム</span></li>
                                      <li><span>奇数</span></li>
                                      <li><span>偶数</span></li>
                                      <li><span>予約ベットのお知らせ表示</span></li>
                                      <li><span>ラウンド数の選択</span></li>
                                      <li><span>ラウンドパネル</span></li>',
    'advanced_bet_panel_desc2_mb'    => '<img src="/img/menu/howtoplay/tutorials/min_custom_btn.png" alt="custom" />
                                 を選択すると予約をするラウンド番号を選べます。<img src="/img/menu/howtoplay/tutorials/min_odd_btn.png" alt="odd" /> (奇数)を選択すると奇数ラウンド番号のみ選択できます。<img src="/img/menu/howtoplay/tutorials/min_even_btn.png" alt="even" /> (偶数)を選択すると偶数ラウンドのみ選択できます。',
    'advanced_bet_panel_title_mb'    => '予約ベットボード',
    'advanced_bet_board_desc1_mb'    => '選択した、予約ベットを表示します。
                                  <img src="/img/menu/howtoplay/tutorials/min_confirm_btn.png" alt="check" /> をクリックで｢ベット確認｣ <img src="/img/menu/howtoplay/tutorials/min_clear_btn.png" alt="clear" /> をクリックするとベットを｢キャンセル｣できます。',
    'dealerinfo_title_mb'            => 'ディーラー情報',
    'dealerinfo_desc_mb'             => "現在のラウンドのディーラー名及び直近の結果を表示します。",
    'gamestatistics_title_mb'        => '統計',
    'gamestatistics_desc1_mb'        => '直近の150ゲームのゲーム結果を表示します。毎ゲーム、
                                    赤/白・1泥炭/2泥炭の勝率が表示されます。ディーラーの交代時にリセットされます。',

    'livebets_statsbutton_title_mb'  => 'ライブベット/スタッツボタン',
    'livebets_statsbutton_desc_mb'   => '<img src="/img/menu/howtoplay/tutorials/min_livebets_btn.png" alt="live bets" />
                                  をクリックすると他プレイヤーがどこにベットしているかをパーセンテージで表示します。<img src="/img/menu/howtoplay/tutorials/min_stats_btn.png" alt="stats" /> をクリックすると自分の統計表示に戻ります。',

    'autobetbutton_title_mb'         => 'オートベットボタン',
    'autobetbutton_desc_mb'          => '<img src="/img/menu/howtoplay/tutorials/autobetbtn.png" alt="auto" />
                                    オートベットボタンをクリックすると5回、10回、15回　同じベットを自動的に繰り返すことができます。',

    'playerinfo_title_mb'            => 'プレイヤー情報',
    'playerinfo_desc_mb'             => '現在ゲームに参加しているプレイヤー
                                    の情報を表示します。勝敗の統計が確認できます。
                                    アバターはゲームロビーで変更できます。',

    'betinfo_title_mb'               => 'ベット情報',
    'betinfo_desc_mb'                => '泥炭残高及び、総ベット額、配当金額を表示します。',
    'channels_and_limit_title_mb'    => 'テーブルとベット限度額',
    'channels_and_limit_desc_mb'     => '現在ゲームしているテーブル番号及び、最低-最高ベット額を表示します。',

    'betting_buttons_timer_title_mb' => 'ベット確定ボタンと制限時間',
    'betting_buttons_timer_desc_mb'  => '<p>｢確定｣ボタンをクリックすると現在のベットが確定されます。
                                    ｢再ベット｣をクリックすると直前のゲームと同じベットがされます。｢キャンセル｣ボタンはベットボードの上の全てのベットをキャンセルできます。制限時間30秒で、確定ボタンの周りにタイマーが表示されます。制限時間残り10秒になると、タイマーがオレンジ色に変わります。</p>

                                    <img src="/img/menu/howtoplay/tutorials/betting_buttons.png" class="betting-btn" alt="betting buttons" />

                                    <p>Tオートベットを使用している場合は、残りのベット回数を表示します。</p>',

    'chips_rack_title_mb'            => 'チップセット',
    'chips_rack_desc_mb'             => '画面右下に表示されるチップトレイです。
                                    メニューのチップの変更からお好みのチップセットにカスタマイズすることができます。',
    'modify_chips_title_mb'          => 'チップの変更',
    'modify_chips_desc_mb'           => 'チップセットをカスタマイズできます。メニューにある
                                    <img src="/img/menu/howtoplay/tutorials/min_modifychips_btn_jp.png" alt="modify chips" /> のアイコンをクリックし お好みのチップをクリックし選択した後、入れ替えたいチップをクリックし<img src="/img/menu/howtoplay/tutorials/min_applychips_btn_jp.png" alt="apply chips" /> のボタンをクリックしてください。<img src="/img/menu/howtoplay/tutorials/min_clearchips_btn_jp.png" alt="clear chips" /> こちらのボタンを押すと現在のセットがリセットされます',
    'modify_chips_img_mb'            => '<img src="/img/menu/howtoplay/tutorials/modify_chips_jp.png" alt="modify chips" class="modifychips" />',


];

?>
