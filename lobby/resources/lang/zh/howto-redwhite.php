<?php

/* CHINESE */

return [
    'game_objective'              => '游戏定义',
    'gameplay'                    => '玩法',
    'types_of_bet'                => '投注类型',

    /** DESKTOP CONTENTS **/

    // game objective
    'gameobj_desc'                => '<h4>游戏规则</h4>
                                    <p>红白跳跳乐是源自菲律宾街头一种称为“布拉布迪”（Red and White）的游戏。该游戏由一张100个方格的棋盘组成，其中包括49个白色方格(<img src="/img/howtoplay/redwhite/white_square.png" alt="white" />)
                                    、49个红色方格(<img src="/img/howtoplay/redwhite/red_square.png" alt="red" />) 和两个带有泥炭符号的N(<img src="/img/howtoplay/redwhite/nihtan_symbol.png" alt="Nihtan" />)组成。</p>
                                    <p>游戏的规则是玩家通过猜测三个球滚落到地方来投注获胜。</p>',

    // gameplay list
    'gameplay_list'               => '<li>玩家将赌注放在桌面上的专属区域。</span></li>
                                      <li>三个乒乓球由荷官投在一个透明的漏斗内。</li>
                                      <li>获奖的颜色组合将基于在棋盘上以至少两个乒乓球以相同颜色的着陆。</li>
                                      <li>如果三个乒乓球的任何一个滚到带有泥炭符号的奖金方格(<img src="/img/howtoplay/redwhite/nihtan_symbol.png" alt="Nihtan" />)上，那么除了奖金注之外的其他投注都会输掉赌注。</li>',

    // type of bets
    'bet'                         => '投注',
    'payout'                      => '赔率',

    'bet_1'                       => '双红',
    'bet_2'                       => '双白',
    'bet_3'                       => '三红',
    'bet_4'                       => '三白',
    'bet_5'                       => '单奖 (<img src="/img/howtoplay/redwhite/nihtan_symbol.png" alt="Nihtan" />)',
    'bet_6'                       => '双奖 (<img src="/img/howtoplay/redwhite/nihtan_symbol.png" alt="Nihtan" /><img src="/img/howtoplay/redwhite/nihtan_symbol.png" alt="Nihtan" />)',

    'payout_1_1'                  => '1赔1',
    'payout_7_1'                  => '1赔7',
    'payout_15_1'                 => '1赔15',
    'payout_250_1'                => '1赔250',

    // 'advanced_bet_panel_title'    => 'Advanced Bet Panel',
    // 'advanced_bet_panel_desc1'    => 'Enables the player to selectively bet for a maximum of 32
    //                                   rounds in advance.',
    // 'advanced_bet_panel_list'     => '<li><span>Place your bet in advance for the next 32 rounds.</span></li>
    //                                   <li><span>Custom</span></li>
    //                                   <li><span>Odd</span></li>
    //                                   <li><span>Even</span></li>
    //                                   <li><span>Displays notification prompts for Advanced Bets</span></li>
    //                                   <li><span>Preselect the type of rounds you want to play</span></li>
    //                                   <li><span>Rounds Panel</span></li>',
    // 'advanced_bet_panel_desc2'    => 'Select <img src="/img/menu/howtoplay/tutorials/min_custom_btn.png" alt="custom" />
    //                               to choose your desired number of rounds with a minimum of 16 rounds and up to 32 rounds. Select <img src="/img/menu/howtoplay/tutorials/min_odd_btn.png" alt="odd" /> if you only want the odd numbered rounds and <img src="/img/menu/howtoplay/tutorials/min_even_btn.png" alt="even" /> if you only want the even numbered rounds.',
    // 'advanced_bet_panel_title'    => 'Advanced Bet Board',
    // 'advanced_bet_board_desc1'    => 'Displays the betting options for your selected advanced
    //                               <img src="/img/menu/howtoplay/tutorials/min_confirm_btn.png" alt="check" /> to confirm placed bets or click <img src="/img/menu/howtoplay/tutorials/min_clear_btn.png" alt="clear" /> to cancel the placed bets.',
    // 'dealerinfo_title'            => 'Dealer Info',
    // 'dealerinfo_desc'             => "Shows the dealer's name, the game number, as well as the last
    //                               winning color combination.",
    // 'gamestatistics_title'        => 'Game Statistics',
    // 'gamestatistics_desc1'        => 'Displays the last 150 winning results, game history on the Bead
    //                               Plate, and the winning percentage of Red/White, 1N/2N and each type of bet. This updates after every game and resets after every dealer change.',
    //
    // 'livebets_statsbutton_title'  => 'Live Bets/Stats Button',
    // 'livebets_statsbutton_desc'   => 'The Live Bets Button <img src="/img/menu/howtoplay/tutorials/min_livebets_btn.png" alt="live bets" />
    //                               allows you to see the percentage of bets of other players. If you click the Stats toggle button <img src="/img/menu/howtoplay/tutorials/min_stats_btn.png" alt="stats" />, it will take you back to your own game statistics.',
    //
    // 'autobetbutton_title'         => 'Auto Bet Button',
    // 'autobetbutton_desc'          => 'When you click the Auto Bet Button <img src="/img/menu/howtoplay/tutorials/autobetbtn.png" alt="auto" />,
    //                                 you can play with the same bets for a certain number of consecutive rounds; either x5, x10 or x15.',
    //
    // 'playerinfo_title'            => 'Player Info',
    // 'playerinfo_desc'             => 'Shows your avatar, user ID and your game winning percentage.
    //                                 You can change your avatar at the lobby settings.',
    //
    // 'betinfo_title'               => 'Bet Info',
    // 'betinfo_desc'                => 'Displays your available credit balance for the current game,
    //                                 the total bet amount placed and the total amount won during the current round.',
    // 'channels_and_limit_title'    => 'Channels & Bet Limit',
    // 'channels_and_limit_desc'     => 'The channel number displays the current channel you are in and
    //                                 the game’s bet limits.',
    //
    // 'betting_buttons_timer_title' => 'Betting Buttons & Timer',
    // 'betting_buttons_timer_desc'  => '<p>The center area of the screen displays the Undo,
    //                                   Confirm and Clear Buttons when placing your bets. The total time allotted for placing bets is 20 seconds. The timer turns orange when it’s the last 10 seconds of countdown. </p>
    //
    //                                 <img src="/img/menu/howtoplay/tutorials/betting_buttons.png" class="betting-btn" alt="betting buttons" />
    //
    //                                 <p>The Undo Button
    //                                 <img src="/img/menu/howtoplay/tutorials/min_undo_btn.png" alt="undo" /> changes to a Repeat Button <img src="/img/menu/howtoplay/tutorials/min_repeat_btn.png" alt="repeat"/> when there was a previous bet that you want to repeat for the next round.</p>
    //
    //                                 <p>If the Auto Bet button has been activated, the Confirm button will change and show the number of remaining auto bets left. This is not a clickable button.</p>',
    //
    // 'chips_rack_title'            => 'chip rack',
    // 'chips_rack_desc'             => 'This is the chip tray area where the default or your preferred
    //                                  set of chips are displayed.',
    // 'modify_chips_title'          => 'modify chips',
    // 'modify_chips_desc'           => 'To customize your chip rack based on your preference, click on the
    //                                 <img src="/img/menu/howtoplay/tutorials/min_modifychips_btn_en.png" alt="modify chips" /> button at the game menu. To modify chips, click on the chip you want to replace and click the replacement chip after. Click <img src="/img/menu/howtoplay/tutorials/min_applychips_btn_en.png" alt="apply chips" /> once you’re okay with your new set of chips or click <img src="/img/menu/howtoplay/tutorials/min_clearchips_btn_en.png" alt="clear chips" /> to clear all chips and start over.',
    // 'modify_chips_img'            => '<img src="/img/menu/howtoplay/tutorials/modify_chips_en.png" alt="modify chips" class="modifychips" />',


    /** MOBILE CONTENTS **/


    // game objective
    'gameobj_desc_mb'                => '<h4>游戏定义</h4>
                                    <p>红白跳跳乐是源自菲律宾街头一种称为“布拉布迪”（Red and White）的游戏。该游戏由一张100个方格的棋盘组成，其中包括49个白色方格(<img src="/img/howtoplay/redwhite/white_square.png" alt="white" />)
                                    、49个红色方格(<img src="/img/howtoplay/redwhite/red_square.png" alt="red" />) 和两个带有泥炭符号的N(<img src="/img/howtoplay/redwhite/nihtan_symbol.png" alt="Nihtan" />)组成。</p>
                                    <p>游戏的规则是玩家通过猜测三个球滚落到地方来投注获胜。</p>',

    // gameplay list
    'gameplay_list_mb'               => '<li>玩家将赌注放在桌面上的专属区域。</span></li>
                                      <li>三个乒乓球由荷官投在一个透明的漏斗内。</li>
                                      <li>获奖的颜色组合将基于在棋盘上以至少两个乒乓球以相同颜色的着陆。</li>
                                      <li>如果三个乒乓球的任何一个滚到带有泥炭符号的奖金方格(<img src="/img/howtoplay/redwhite/nihtan_symbol.png" alt="Nihtan" />)上，那么除了奖金注之外的其他投注都会输掉赌注。</li>',

    // type of bets
    'bet_mb'                         => '投注',
    'payout_mb'                      => '赔率',

    'bet_1_mb'                       => '双红',
    'bet_2_mb'                       => '双白',
    'bet_3_mb'                       => '三红',
    'bet_4_mb'                       => '三白',
    'bet_5_mb'                       => '单奖 (<img src="/img/howtoplay/redwhite/nihtan_symbol.png" alt="Nihtan" />)',
    'bet_6_mb'                       => '双奖 (<img src="/img/howtoplay/redwhite/nihtan_symbol.png" alt="Nihtan" /><img src="/img/howtoplay/redwhite/nihtan_symbol.png" alt="Nihtan" />)',

    'payout_1_1_mb'                  => '1赔1',
    'payout_7_1_mb'                  => '1赔7',
    'payout_15_1_mb'                 => '1赔15',
    'payout_250_1_mb'                => '1赔250',

    // 'advanced_bet_panel_title_mb'    => 'Advanced Bet Panel',
    // 'advanced_bet_panel_desc1_mb'    => 'Enables the player to selectively bet for a maximum of 32
    //                                   rounds in advance.',
    // 'advanced_bet_panel_list_mb'     => '<li><span>Place your bet in advance for the next 32 rounds.</span></li>
    //                                   <li><span>Custom</span></li>
    //                                   <li><span>Odd</span></li>
    //                                   <li><span>Even</span></li>
    //                                   <li><span>Displays notification prompts for Advanced Bets</span></li>
    //                                   <li><span>Preselect the type of rounds you want to play</span></li>
    //                                   <li><span>Rounds Panel</span></li>',
    // 'advanced_bet_panel_desc2_mb'    => 'Select <img src="/img/menu/howtoplay/tutorials/min_custom_btn.png" alt="custom" />
    //                               to choose your desired number of rounds with a minimum of 16 rounds and up to 32 rounds. Select <img src="/img/menu/howtoplay/tutorials/min_odd_btn.png" alt="odd" /> if you only want the odd numbered rounds and <img src="/img/menu/howtoplay/tutorials/min_even_btn.png" alt="even" /> if you only want the even numbered rounds.',
    // 'advanced_bet_panel_title_mb'    => 'Advanced Bet Board',
    // 'advanced_bet_board_desc1_mb'    => 'Displays the betting options for your selected advanced
    //                               <img src="/img/menu/howtoplay/tutorials/min_confirm_btn.png" alt="check" /> to confirm placed bets or click <img src="/img/menu/howtoplay/tutorials/min_clear_btn.png" alt="clear" /> to cancel the placed bets.',
    // 'dealerinfo_title_mb'            => 'Dealer Info',
    // 'dealerinfo_desc_mb'             => "Shows the dealer's name, the game number, as well as the last
    //                               winning color combination.",
    // 'gamestatistics_title_mb'        => 'Game Statistics',
    // 'gamestatistics_desc1_mb'        => 'Displays the last 150 winning results, game history on the Bead
    //                               Plate, and the winning percentage of Red/White, 1N/2N and each type of bet. This updates after every game and resets after every dealer change.',
    //
    // 'livebets_statsbutton_title_mb'  => 'Live Bets/Stats Button',
    // 'livebets_statsbutton_desc_mb'   => 'The Live Bets Button <img src="/img/menu/howtoplay/tutorials/min_livebets_btn.png" alt="live bets" />
    //                               allows you to see the percentage of bets of other players. If you click the Stats toggle button <img src="/img/menu/howtoplay/tutorials/min_stats_btn.png" alt="stats" />, it will take you back to your own game statistics.',
    //
    // 'autobetbutton_title_mb'         => 'Auto Bet Button',
    // 'autobetbutton_desc_mb'          => 'When you click the Auto Bet Button <img src="/img/menu/howtoplay/tutorials/autobetbtn.png" alt="auto" />,
    //                                 you can play with the same bets for a certain number of consecutive rounds; either x5, x10 or x15.',
    //
    // 'playerinfo_title_mb'            => 'Player Info',
    // 'playerinfo_desc_mb'             => 'Shows your avatar, user ID and your game winning percentage.
    //                                 You can change your avatar at the lobby settings.',
    //
    // 'betinfo_title_mb'               => 'Bet Info',
    // 'betinfo_desc_mb'                => 'Displays your available credit balance for the current game,
    //                                 the total bet amount placed and the total amount won during the current round.',
    // 'channels_and_limit_title_mb'    => 'Channels & Bet Limit',
    // 'channels_and_limit_desc_mb'     => 'The channel number displays the current channel you are in and
    //                                 the game’s bet limits.',
    //
    // 'betting_buttons_timer_title_mb' => 'Betting Buttons & Timer',
    // 'betting_buttons_timer_desc_mb'  => '<p>The center area of the screen displays the Undo,
    //                                   Confirm and Clear Buttons when placing your bets. The total time allotted for placing bets is 20 seconds. The timer turns orange when it’s the last 10 seconds of countdown. </p>
    //
    //                                 <img src="/img/menu/howtoplay/tutorials/betting_buttons.png" class="betting-btn" alt="betting buttons" />
    //
    //                                 <p>The Undo Button
    //                                 <img src="/img/menu/howtoplay/tutorials/min_undo_btn.png" alt="undo" /> changes to a Repeat Button <img src="/img/menu/howtoplay/tutorials/min_repeat_btn.png" alt="repeat"/> when there was a previous bet that you want to repeat for the next round.</p>
    //
    //                                 <p>If the Auto Bet button has been activated, the Confirm button will change and show the number of remaining auto bets left. This is not a clickable button.</p>',
    //
    // 'chips_rack_title_mb'            => 'chip rack',
    // 'chips_rack_desc_mb'             => 'This is the chip tray area where the default or your preferred
    //                                  set of chips are displayed.',
    // 'modify_chips_title_mb'          => 'modify chips',
    // 'modify_chips_desc_mb'           => 'To customize your chip rack based on your preference, click on the
    //                                 <img src="/img/menu/howtoplay/tutorials/min_modifychips_btn_en.png" alt="modify chips" /> button at the game menu. To modify chips, click on the chip you want to replace and click the replacement chip after. Click <img src="/img/menu/howtoplay/tutorials/min_applychips_btn_en.png" alt="apply chips" /> once you’re okay with your new set of chips or click <img src="/img/menu/howtoplay/tutorials/min_clearchips_btn_en.png" alt="clear chips" /> to clear all chips and start over.',
    // 'modify_chips_img_mb'            => '<img src="/img/menu/howtoplay/tutorials/modify_chips_en.png" alt="modify chips" class="modifychips" />',

];

?>
