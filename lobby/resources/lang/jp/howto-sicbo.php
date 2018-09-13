<?php

/* JAPANESE */

return [
	/***** GAME RULES ******/
	'gameobj_header'     => 'ゲームの概要',
	'gameplay_header'    => 'ゲームの流れ',
	'typesofbets_header' => '泥炭の配当表',

	/***** GAME OBJECTIVE ******/
	/* pc */
	'gameobj_body'       =>  '<h4>ゲームの概要</h4>
														<p>シックボーはサイコロ三つを使って出目を予想するゲームです。約50個以上のBET箇所があり、それぞれ配当が変わります。</p>',
  /* mobile */
	'gameobj_body-mb'    =>  '<h4>ゲームの概要</h4>
														<p>シックボーはサイコロ三つを使って出目を予想するゲームです。約50個以上のBET箇所があり、それぞれ配当が変わります。</p>',

	/***** GAMEPLAY ******/
	/* pc */
	'gameplay_body'      => '<li>プレイヤーはテーブルのBET箇所にBETをします。</li>
													 <li>好きなBET箇所に好きなだけプレイヤーはBETできます。</li>
													 <li>ディーラーはシェーカーの中に入っている3つのサイコロを振り(シャッフル)、勝ち目を決定します。</li>',

	'gameplay_body2'     => '※	サイコロが重なったりした場合は、出目は無効となり、再度サイコロをシャッフルします。',

	/* mobile */
	'gameplay_body-mb'   => '<li>プレイヤーはテーブルのBET箇所にBETをします。</li>
													 <li>好きなBET箇所に好きなだけプレイヤーはBETできます。</li>
													 <li>ディーラーはシェーカーの中に入っている3つのサイコロを振り(シャッフル)、勝ち目を決定します。</li>',

	'gameplay_body2-mb'  => '※	サイコロが重なったりした場合は、出目は無効となり、再度サイコロをシャッフルします。',

	/***** TYPES OF BETS/PAYOUTS ******/
	'type_of_bets'       => 'ベット',
	'description'        => '条件',
	'nihtan_payouts'     => 'ペイアウト',

	'big_type'					   => '<img src="/img/howtoplay/sicbo/dark/a.png" alt="image"> ビッグ(BIG)',
	'small_type'				   => '<img src="/img/howtoplay/sicbo/dark/a.png" alt="image"> スモール(SMALL)',
	'odd_type'					   => '<img src="/img/howtoplay/sicbo/dark/b.png" alt="image"> ODD (奇数)',
	'even_type'					   => '<img src="/img/howtoplay/sicbo/dark/b.png" alt="image"> EVEN(偶数)',
	'sum4_type'					   => '<img src="/img/howtoplay/sicbo/dark/f.png" alt="image"> TOTAL NUMBER(合計値)',
	'triple_type'				   => '<img src="/img/howtoplay/sicbo/dark/e.png" alt="image"> SPECIFIC TRIPLE(トリプル)',
	'anytriple_type'		   => '<img src="/img/howtoplay/sicbo/dark/d.png" alt="image"> ANY TRIPLE(エニートリプル)',
	'specificdouble_type'  => '<img src="/img/howtoplay/sicbo/dark/c.png" alt="image"> SPECIFIC DOUBLE(ダブル)',
	'dicecombination_type' => '<img src="/img/howtoplay/sicbo/dark/g.png" alt="image"> DICE COMBINATION(ドミノ)',
	'3-singlenumber_type'  => '<img src="/img/howtoplay/sicbo/dark/h.png" alt="image"> 3-SINGLE NUMBER COMBINATION(3コンビネーション)',
	'singledicebet_type'   => '<img src="/img/howtoplay/sicbo/dark/i.png" alt="image"> SINGLE',

	/* pc */
	'big_desc'					   =>	'出目の合計が11~17',
	'small_desc'				   => '出目の合計が4~10',
	'odd_desc'		  		   => '出目の合計が奇数',
	'even_desc'		  		   => '出目の合計が偶数',
	'sum4_17_desc'		     => '出目の合計が4または17',
	'sum5_16_desc'		     => '出目の合計が5または16',
	'sum6_15_desc'		     => '出目の合計が6または15',
	'sum7_14_desc'		     => '出目の合計が7または14',
	'sum8_13_desc'		     => '出目の合計が8または13',
	'sum9_12_desc'		     => '出目の合計が9または12',
	'sum10_11_desc'		     => '出目の合計が10または11',
	'triple_desc'		       => 'サイコロ3つの出目が全て指定した数字(ゾロ目)',
	'anytriple_desc'		   => 'サイコロ3つの出目がゾロ目(指定なし)',
	'specificdouble_desc'  => 'サイコロ3個中2つの出目が指定した数字',
	'dicecombination_desc' => '数字2つの組み合わせを選択し、サイコロ3個中2つの出目が指定した数字',
	'3-singlenumber_desc'  => 'サイコロの出目が指定した数字の組み合わせ(数字4つ)の内、3つが一致',
	'singledicebet1_desc'  => '3つのサイコロのうち1つ的中',
	'singledicebet2_desc'  => '3つのサイコロのうち2つ的中',
	'singledicebet3_desc'  => '3つのサイコロのうち3つ的中',

	/* mobile */
	'big_desc-mb'					    => '出目の合計が11~17',
	'small_desc-mb'				    => '出目の合計が4~10',
	'odd_desc-mb'		  		    => '出目の合計が奇数',
	'even_desc-mb'		  		  => '出目の合計が偶数',
	'sum4_17_desc-mb'		      => '出目の合計が4または17',
	'sum5_16_desc-mb'		      => '出目の合計が5または16',
	'sum6_15_desc-mb'		      => '出目の合計が6または15',
	'sum7_14_desc-mb'		      => '出目の合計が7または14',
	'sum8_13_desc-mb'		      => '出目の合計が8または13',
	'sum9_12_desc-mb'		      => '出目の合計が9または12',
	'sum10_11_desc-mb'		    => '出目の合計が10または11',
	'triple_desc-mb'		      => 'サイコロ3つの出目が全て指定した数字(ゾロ目)',
	'anytriple_desc-mb'		    => 'サイコロ3つの出目がゾロ目(指定なし)',
	'specificdouble_desc-mb'  => 'サイコロ3個中2つの出目が指定した数字',
	'dicecombination_desc-mb' => '数字2つの組み合わせを選択し、サイコロ3個中2つの出目が指定した数字',
	'3-singlenumber_desc-mb'  => 'サイコロの出目が指定した数字の組み合わせ(数字4つ)の内、3つが一致',
	'singledicebet1_desc-mb'  => '3つのサイコロのうち1つ的中',
	'singledicebet2_desc-mb'  => '3つのサイコロのうち2つ的中',
	'singledicebet3_desc-mb'  => '3つのサイコロのうち3つ的中',

	'payout_1'           => '1 : 1',
	'payout_2'           => '1 : 1',
	'payout_3'           => '1 : 1',
	'payout_4'           => '1 : 1',
	'payout_5'           => '50 : 1',
	'payout_6'           => '18 : 1',
	'payout_7'           => '14 : 1',
	'payout_8'           => '12 : 1',
	'payout_9'           => '8 : 1',
	'payout_10'          => '6 : 1',
	'payout_11'          => '6 : 1',
	'payout_12'          => '150 : 1',
	'payout_13'          => '24 : 1',
	'payout_14'          => '8 : 1',
	'payout_15'          => '5 : 1',
	'payout_16'          => '7 : 1',
	'payout_17'          => '1 : 1',
	'payout_18'          => '2 : 1',
	'payout_19'          => '3 : 1',

  /* ingame tutorial*/

	/***** MULTIBET ******/
	'multibet_title'     => 'マルチベット',
	'multibet_desc'      => 'マルチベットパネルが有効化されていない状態では ゲームの基本的な統計を表示します。 <img src="/img/menu/howtoplay/preview.png" alt="game statistics" class="multibetimg"/>
													 をクリックすることで、詳細な統計を表示し、 <img src="/img/menu/howtoplay/go.png" alt="game statistics" class="multibetimg"/> をクリックするとテーブル移動が行えます。
													<img src="/img/menu/howtoplay/dark/plus_icon.png" alt="game statistics" class="multibetimg changeImg"/> をクリックするとマルチベットパネルが開き、他のゲームへのBETが行えます。',

	'multibet_info'      => '<img src="/img/menu/howtoplay/dark/multibet_active_jp.png" alt="game statistics" class="changeImg multibetinfoimg"/>
													 <p>マルチベットパネルを有効化すると最大3テーブルまで同時にプレイすることができます。<img src="/img/menu/howtoplay/close.png" alt="game statistics"/> または、 <img src="/img/menu/howtoplay/minimize.png" alt="game statistics"/> をクリックすることにより、マルチベットパネルが最小化されます。
													 </p>',

	'multibet_img'       => '<img src="/img/menu/howtoplay/dark/multibet_jp.png" alt="multibet" class="changeImg" />',

	/***** DEALER INFO ******/
	/* pc */
	'dealerinfo'         => '<h4>ディーラー情報</h4>
													 <p>ディーラーの名前、ゲーム番号、前のゲームのダイスが表示されます。</p>',
  /* mobile */
  'dealerinfo-mb'      => '<h4>ディーラー情報</h4>
                           <p>ディーラーの名前、ゲーム番号、前のゲームのダイスが表示されます。</p>

                           <h4>テーブルとベット限度額</h4>
                           <p>現在のテーブル番号とベット限度額が表示されます。</p>',

  /***** GAME STATISTICS ******/
  /* pc */
	'gamestatistics'     => '<h4>統計</h4>
													 <p>勝利した、直近5ゲームの結果が表示されます。毎ゲーム、Odd(奇)/Even(偶),ビッグ(Big)/スモール(Small),ダブル,トリプルの勝率が更新されます。ディーラーが交代するとリセットされます。</p>

													 <img src="/img/menu/howtoplay/dark/game_stats_jp.png" class="roadmap changeImg" alt="game stats" />

													 <p>ボタンの説明:
													 <img src="/img/menu/howtoplay/oddeven_btn_en.png" width="12%"/>
													 <img src="/img/menu/howtoplay/bigsmall_btn_en.png" width="12%"/>
													 <img src="/img/menu/howtoplay/sum_btn_jp.png" width="12%"/>
													 <img src="/img/menu/howtoplay/dice_btn_en.png" width="12%"/>
													 クリックすると各ベットのゲーム結果が表示されます。<p>',
	/* mobile */
	'gamestatistics-mb'  => '<h4>統計</h4>
	                         <p>HOT COLDナンバーと直近５ゲームの履歴とゲーム結果が表示されます。 結果はすべてのゲーム後に更新され、ディーラーの交代毎にリセットされます。プレートをタップすると、ビッグ/スモール、ダブルまたはトリプルの勝率を表示します。</p>

	                         <img src="/img/menu/howtoplay/mobile/game_stats1_jp.png" class="roadmap" alt="game stats" />',

	/***** PLAYER INFO ******/
	'playerinfo_title'   => 'プレイヤー情報',
	/* pc */
	'playerinfo_desc'    => '現在ゲームに参加しているプレイヤーの情報を表示します。勝敗の統計が確認できます。アバターはゲームロビーで変更できます。',
	/* mobile */
	'playerinfo_desc-mb' => '現在ゲームに参加しているプレイヤーの情報を表示します。勝敗の統計が確認できます。アバターはゲームロビーで変更できます。',
	/* pc */
	'playerinfo_img'     => '<img src="/img/menu/howtoplay/dark/player_info_jp.png" alt="player info" class="changeImg" />',
	/* mobile */
	'playerinfo_img-mb'  => '<img src="/img/menu/howtoplay/dark/mobile/player_info_jp.png" alt="player info" class="changeImg" />',

	/***** BET INFO ******/
	'betinfo_title'      => 'ベット情報',
	/* pc */
	'betinfo_desc'       => '泥炭残高及び、総ベット額、配当金額を表示します。',
	/* mobile */
	'betinfo_desc-mb'    => '泥炭残高及び、総ベット額、配当金額を表示します。',
	/* pc */
	'betinfo_img'        => '<img src="/img/menu/howtoplay/dark/bet_info_jp.png" alt="bet info" class="changeImg" />',
	/* mobile */
	'betinfo_img-mb'     => '<img src="/img/menu/howtoplay/dark/mobile/bet_info_jp.png" alt="bet info" class="changeImg" />',

	/***** CHANNEL/BET ******/
  'channels_and_limit_title'  => 'テーブルとベット限度額',
	'channels_and_limit_desc'   => '現在のテーブル番号とベット限度額が表示されます。',
	'channels_and_limit_img'    => '<img src="/img/menu/howtoplay/dark/channels_jp.png" alt="channels" class="changeImg" />',

	/***** BETTING BUTTONS ******/
	'betting_buttons_timer_title'    => 'ベット確認ボタンと制限時間',
	/* pc */
	'betting_buttons_timer_desc'     => '<p>｢確認｣ボタンをクリックすると現在のベットが確定されます。｢リピート｣をクリックすると直前のゲームと同じベットがされます。｢クリア｣ボタンはベットボードの上の全てのベットをキャンセルできます。制限時間20秒で、確定ボタンの周りにタイマーが表示されます。制限時間残り10秒になると、タイマーがオレンジ色に変わります。</p>

																			<img src="/img/menu/howtoplay/betting_buttons_jp.png" class="betting-btn" alt="betting buttons">

																			<p>「戻る」ボタン<img src="/img/menu/howtoplay/undo_btn_jp.png" class="undo" alt="undo"/>「リピート」ボタンはベットを開始すると「戻る」ボタンに変わります。
																			<img src="/img/menu/howtoplay/repeat_btn_jp.png" class="undo" alt="undo"/>「リピート」ボタンを押すと直前のラウンドと同じベットができます。</p>',
	/* mobile */
	'betting_buttons_timer_desc-mb'  => "<p>確認、戻る、クリアボタンが表示されます。制限時間20秒で確認ボタンの周りにタイマーが表示されます。制限時間残り10秒になると、タイマーがオレンジ色に変わります。</p>

																			 <img src='/img/menu/howtoplay/mobile/betting_buttons_jp.png' class='betting-btn' alt='betting buttons'>

																			 <p> 「戻る」ボタン <img src='/img/menu/howtoplay/undo_btn_jp.png' alt='repeat'/>「リピート」ボタンはベットを開始すると「戻る」ボタンに変わります。
                                       <img src='/img/menu/howtoplay/repeat_btn_jp.png' alt='repeat'/>「リピート」ボタンを押すと直前のラウンドと同じベットができます。</p>",

  /***** CHIP ******/
  'chips_rack_title'   => 'チップセット',
	/* pc */
  'chips_rack_desc'    => '画面右下に表示されるチップトレイです。メニューのチップの変更からお好みのチップセットにカスタマイズすることができます。',
	/* mobile */
	'chips_rack_desc-mb' => '画面右下に表示されるチップトレイです。メニューのチップの変更からお好みのチップセットにカスタマイズすることができます。',
	/* pc */
  'chips_rack_img'     => '<img src="/img/menu/howtoplay/chip_rack_jp.png" alt="chip rack">',
	/* mobile */
	'chips_rack_img-mb'  => '<img src="/img/menu/howtoplay/mobile/chip_rack_jp.png" alt="chip rack">',

	/***** MODIFY CHIPS ******/
	'modify_chips_title'  => 'チップの変更',
	/* pc */
	'modify_chips_desc'   => "チップセットをカスタマイズできます。メニューにある <img src='/img/menu/howtoplay/dark/modifychips_btn_jp.png' class='modify changeImg' alt='modify chips'/>
													 のアイコンをクリックし、お好みのチップをクリックし選択した後、入れ替えたいチップをクリックし <img src='/img/menu/howtoplay/applychips_btn_jp.png' class='applyclear-btn' alt='apply chips'/>
													 のボタンをクリックしてください。 <img src='/img/menu/howtoplay/dark/clearchips_btn_jp.png' class='applyclear-btn changeImg' alt='apply chips'/>
													 こちらのボタンを押すと現在のセットがリセットされます。",
  /* mobile */
	'modify_chips_desc-mb'  => "チップセットをカスタマイズできます。メニューにある <img src='/img/menu/howtoplay/dark/mobile/modifychips_btn.png' class='modify changeImg' alt='modify chips'/>
															のアイコンをクリックし、お好みのチップをクリックし選択した後、入れ替えたいチップをクリックし <img src='/img/menu/howtoplay/applychips_btn_jp.png' class='applyclear-btn' alt='apply chips'/>
															のボタンをクリックしてください。 <img src='/img/menu/howtoplay/dark/clearchips_btn_jp.png' class='applyclear-btn changeImg' alt='clear chips'/>
															こちらのボタンを押すと現在のセットがリセットされます。",
	/* pc */
	'modify_chips_img'    => "<img src='/img/menu/howtoplay/dark/modify_chips_jp.png' alt='modify chips' class='modifychips changeImg'>",
	/* mobile */
	'modify_chips_img-mb' => "<img src='/img/menu/howtoplay/dark/mobile/modify_chips_jp.png' alt='modify chips' class='modifychips changeImg'>",

	/***** MOBILE images ******/
	'dealer_img-mb'       => '<img src="/img/menu/howtoplay/dark/mobile/dealer_info.png" alt="dealer info" class="changeImg" />',

	'menu_button_title'   => 'メニューボタン',
	'menu_button_desc'    => '<p><img src="/img/menu/howtoplay/mobile/menu_btn.png" width="60px" alt="menu button" />
														アイコンをクリックすると全てのメニューが表示されます。</p>',

];

?>
