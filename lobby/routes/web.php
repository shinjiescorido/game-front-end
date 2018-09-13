<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/test', function () {
    Auth::loginUsingId(2904, true);
});
Route::get('/test/dollar', function () {
    Auth::loginUsingId(51534, true);
});

Route::get('/test/dollar2', function () {
    Auth::loginUsingId(3037, true);
});

Route::get('/rejected', 'BetHistoryController@checkReject');

Route::group(['middleware' => ['web', 'auth']], function () {
    Route::post('/logout', 'Auth\LoginController@logout');
    Route::group(['prefix' => '/betsoft'], function () {
        Route::get('/reel', 'BetSoftController@index');
        Route::post('/token', 'BetSoftController@token');
    });

    Route::group(['prefix' => '/kaga'], function () {
        Route::get('/test', 'KagaController@test');
        Route::get('/list', 'KagaController@index');
        Route::post('/token', 'KagaController@token');
    });

    Route::post('/getUserMoney', 'BetHistoryController@getUserMoney');

    Route::post('/settings', 'BetHistoryController@setUserConfig');
    Route::post('/settingGame', 'BetHistoryController@setLastGameInfo');
    Route::post('/setTableInfo', 'BetHistoryController@setJunketTableInfo');
    Route::group(['prefix' => '/'], function () {
        Route::get('/', 'BetHistoryController@index3');
        Route::get('/3', 'BetHistoryController@index');
        //Dealer Image
        Route::post('/getDealerImg', 'BetHistoryController@getDealerImg');
        Route::post('/getChangeDealerImg', 'BetHistoryController@getChangeDealerImg');

        //Transfer Logs
        Route::match(array('GET','POST'),'/transferlogs', 'BetHistoryController@getTransferLogs');

        Route::match(array('GET','POST'),'/alllogs', 'BetHistoryController@getAllLogs');

        Route::post('/details/getBaccaratDetails', 'BetHistoryController@getBaccaratDetails');

        Route::match(array('GET','POST'),'/supersixlogs', 'BetHistoryController@getSupersixBetLogs');
        Route::post('/details/getSupersixDetails', 'BetHistoryController@getSupersixDetails');

        Route::match(array('GET','POST'),'/dragonbonuslogs', 'BetHistoryController@getDragonBonusBetLogs');
        Route::post('/details/getDragonBonusDetails', 'BetHistoryController@getDragonBonusDetails');

        Route::post('/details/getPokerDetails', 'BetHistoryController@getPokerDetails');

        Route::match(array('GET','POST'),'/bonuspluslogs', 'BetHistoryController@getBonusPlusBetLogs');
        Route::post('/details/getBonusPlusDetails', 'BetHistoryController@getBonusPlusDetails');

        Route::post('/details/getSicboDetails', 'BetHistoryController@getSicboDetails');

        Route::post('/details/getDragontigerDetails', 'BetHistoryController@getDragontigerDetails');

        Route::match(array('GET','POST'),'/pulaputilogs', 'BetHistoryController@getPulaputiBetLogs');
        Route::post('/details/getPulaputiDetails', 'BetHistoryController@getPulaputiDetails');

        Route::match(array('GET','POST'),'/bigwheellogs', 'BetHistoryController@getBigWheelBetLogs');
        Route::post('/details/getBigWheelDetails', 'BetHistoryController@getBigWheelDetails');

        Route::match(array('GET','POST'),'/kagalogs', 'BetHistoryController@getKagaLogs');

        Route::post('/details/getPaigowDetails', 'BetHistoryController@getPaigowDetails');

        //web 3.0
        Route::match(array('GET','POST'),'/getLogs', 'BetHistoryController@getGameLogs');
        // Route::match(array('GET','POST'),'/pokerlogs/{game}', 'BetHistoryController@getGameLogs');
        // Route::match(array('GET','POST'),'/sicbologs/{game}', 'BetHistoryController@getGameLogs');
        // Route::match(array('GET','POST'),'/dragontigerlogs/{game}', 'BetHistoryController@getGameLogs');
        // Route::match(array('GET','POST'),'/paigowlogs/{game}', 'BetHistoryController@getGameLogs');

        // Room info
        Route::match(array('GET','POST'),'/setRoomData', 'BetHistoryController@setRoomData');
        Route::match(array('GET','POST'),'/checkPass', 'BetHistoryController@checkPass');

        Route::match(array('GET','POST'),'/canCreateRoom', 'BetHistoryController@canCreateRoom');
    });

    // Route::group(['prefix' => '/m'], function () {
    //     Route::get('/', 'BetHistoryController@indexMobile');
    //
    //     //Transfer Logs
    //     Route::match(array('GET','POST'),'/transferlogs', 'BetHistoryController@getTransferLogs');
    //
    //     Route::match(array('GET','POST'),'/alllogs', 'BetHistoryController@getAllLogsMobile');
    //
    //     Route::match(array('GET','POST'),'/baccaratlogs', 'BetHistoryController@getBaccaratBetLogs');
    //     Route::post('/details/getBaccaratDetails', 'BetHistoryController@getBaccaratDetails');
    //
    //     Route::match(array('GET','POST'),'/supersixlogs', 'BetHistoryController@getSupersixBetLogs');
    //     Route::post('/details/getSupersixDetails', 'BetHistoryController@getSupersixDetails');
    //
    //     Route::match(array('GET','POST'),'/dragonbonuslogs', 'BetHistoryController@getDragonBonusBetLogs');
    //     Route::post('/details/getDragonBonusDetails', 'BetHistoryController@getDragonBonusDetails');
    //
    //     Route::match(array('GET','POST'),'/pokerlogs', 'BetHistoryController@getPokerBetLogs');
    //     Route::post('/details/getPokerDetails', 'BetHistoryController@getPokerDetails');
    //
    //     Route::match(array('GET','POST'),'/bonuspluslogs', 'BetHistoryController@getBonusPlusBetLogs');
    //     Route::post('/details/getBonusPlusDetails', 'BetHistoryController@getBonusPlusDetails');
    //
    //     Route::match(array('GET','POST'),'/sicbologs', 'BetHistoryController@getSicboBetLogs');
    //     Route::post('/details/getSicboDetails', 'BetHistoryController@getSicboDetails');
    //
    //     Route::match(array('GET','POST'),'/dragontigerlogs', 'BetHistoryController@getDragontigerBetLogs');
    //     Route::post('/details/getDragontigerDetails', 'BetHistoryController@getDragontigerDetails');
    //
    //     Route::match(array('GET','POST'),'/pulaputilogs', 'BetHistoryController@getPulaputiBetLogs');
    //     Route::post('/details/getPulaputiDetails', 'BetHistoryController@getPulaputiDetails');
    //
    //     Route::match(array('GET','POST'),'/bigwheellogs', 'BetHistoryController@getBigWheelBetLogs');
    //     Route::post('/details/getBigWheelDetails', 'BetHistoryController@getBigWheelDetails');
    //
    //     Route::match(array('GET','POST'),'/paigowlogs', 'BetHistoryController@getPaigowLogs');
    // });

    // version 3 mobile
    Route::group(['prefix' => '/m'], function () {
        Route::get('/', 'BetHistoryController@indexMobile3');

        //Transfer Logs
        Route::match(array('GET','POST'),'/transferlogs', 'BetHistoryController@getTransferLogs');

        Route::match(array('GET','POST'),'/alllogs', 'BetHistoryController@getAllLogsMobile');

        Route::match(array('GET','POST'),'/baccaratlogs', 'BetHistoryController@getBaccaratBetLogs');
        Route::post('/details/getBaccaratDetails', 'BetHistoryController@getBaccaratDetails');

        Route::match(array('GET','POST'),'/supersixlogs', 'BetHistoryController@getSupersixBetLogs');
        Route::post('/details/getSupersixDetails', 'BetHistoryController@getSupersixDetails');

        Route::match(array('GET','POST'),'/dragonbonuslogs', 'BetHistoryController@getDragonBonusBetLogs');
        Route::post('/details/getDragonBonusDetails', 'BetHistoryController@getDragonBonusDetails');

        Route::match(array('GET','POST'),'/pokerlogs', 'BetHistoryController@getPokerBetLogs');
        Route::post('/details/getPokerDetails', 'BetHistoryController@getPokerDetails');

        Route::match(array('GET','POST'),'/bonuspluslogs', 'BetHistoryController@getBonusPlusBetLogs');
        Route::post('/details/getBonusPlusDetails', 'BetHistoryController@getBonusPlusDetails');

        Route::match(array('GET','POST'),'/sicbologs', 'BetHistoryController@getSicboBetLogs');
        Route::post('/details/getSicboDetails', 'BetHistoryController@getSicboDetails');

        Route::match(array('GET','POST'),'/dragontigerlogs', 'BetHistoryController@getDragontigerBetLogs');
        Route::post('/details/getDragontigerDetails', 'BetHistoryController@getDragontigerDetails');

        Route::match(array('GET','POST'),'/pulaputilogs', 'BetHistoryController@getPulaputiBetLogs');
        Route::post('/details/getPulaputiDetails', 'BetHistoryController@getPulaputiDetails');

        Route::match(array('GET','POST'),'/bigwheellogs', 'BetHistoryController@getBigWheelBetLogs');
        Route::post('/details/getBigWheelDetails', 'BetHistoryController@getBigWheelDetails');

        Route::match(array('GET','POST'),'/paigowlogs', 'BetHistoryController@getPaigowLogs');
    });

    Route::group(['prefix' => '/non'], function () {
        Route::get('/', 'BetHistoryController@indexMobileNoinstall');
    	// Route::get('/2', 'BetHistoryController@indexMobileNoinstall');

        //Transfer Logs
        Route::match(array('GET','POST'),'/transferlogs', 'BetHistoryController@getTransferLogs');

        Route::match(array('GET','POST'),'/alllogs', 'BetHistoryController@getAllLogsMobile');

        Route::match(array('GET','POST'),'/baccaratlogs', 'BetHistoryController@getBaccaratBetLogs');
        Route::post('/details/getBaccaratDetails', 'BetHistoryController@getBaccaratDetails');

        Route::match(array('GET','POST'),'/supersixlogs', 'BetHistoryController@getSupersixBetLogs');
        Route::post('/details/getSupersixDetails', 'BetHistoryController@getSupersixDetails');

        Route::match(array('GET','POST'),'/dragonbonuslogs', 'BetHistoryController@getDragonBonusBetLogs');
        Route::post('/details/getDragonBonusDetails', 'BetHistoryController@getDragonBonusDetails');

        Route::match(array('GET','POST'),'/pokerlogs', 'BetHistoryController@getPokerBetLogs');
        Route::post('/details/getPokerDetails', 'BetHistoryController@getPokerDetails');

        Route::match(array('GET','POST'),'/bonuspluslogs', 'BetHistoryController@getBonusPlusBetLogs');
        Route::post('/details/getBonusPlusDetails', 'BetHistoryController@getBonusPlusDetails');

        Route::match(array('GET','POST'),'/sicbologs', 'BetHistoryController@getSicboBetLogs');
        Route::post('/details/getSicboDetails', 'BetHistoryController@getSicboDetails');

        Route::match(array('GET','POST'),'/dragontigerlogs', 'BetHistoryController@getDragontigerBetLogs');
        Route::post('/details/getDragontigerDetails', 'BetHistoryController@getDragontigerDetails');

        Route::match(array('GET','POST'),'/pulaputilogs', 'BetHistoryController@getPulaputiBetLogs');
        Route::post('/details/getPulaputiDetails', 'BetHistoryController@getPulaputiDetails');

        Route::match(array('GET','POST'),'/bigwheellogs', 'BetHistoryController@getBigWheelBetLogs');
        Route::post('/details/getBigWheelDetails', 'BetHistoryController@getBigWheelDetails');
    });
});
