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

// Route::get('/test/{table}/{range}/{multiplayer}', function ($table, $range, $multiplayer) {

Route::get('/test', function () {
    Auth::loginUsingId(4527,true);
});

Route::get('/test/dollar', function () {
    Auth::loginUsingId(3037,true);
});
Route::get('/test/dollar2', function () {
    Auth::loginUsingId(3037,true);
});

Route::get('/test/{id}', function ($id) {
    Auth::loginUsingId($id,true);
});

Route::get('/flip/portrait', function () {
    return view('testflip');
});

Route::get('/rejected', 'BaccaratController@checkReject');

Route::group(['middleware' => ['web', 'auth']], function () {

    //get junket users
    Route::post('/getJunket/{roomId}', 'BaccaratController@getJunketUsers');
    Route::post('/checkPassword', 'BaccaratController@checkPassword');
    Route::post('/updateRoom', 'BaccaratController@setRoomInfo');
    Route::post('/getJunketLogs', 'BaccaratController@getJunketLogs');
    Route::post('/checkTable', 'BaccaratController@checkTable');

    //test betting for multibet
    Route::post('/poker/bet/store/{table}/{range}', 'PokerController@store');
    Route::post('/poker/bet/setFoldCheck/{table}','PokerController@setFoldCheck');
    Route::post('/poker/bet/cancelMulti/{table}/{range}','PokerController@cancelMulti');
    Route::post('/sicbo/actionlogs/store/{table}/{range}','PokerController@actionLogs');

    Route::post('/dragontiger/bet/store/{table}/{range}', 'DragonTigerController@testStore');
    Route::post('/dragontiger/bet/cancelMulti/{table}/{range}', 'DragonTigerController@testCancel');
    Route::post('/dragontiger/actionlogs/store/{table}/{range}', 'DragonTigerController@actionLogs');

    Route::post('/sicbo/bet/store/{table}/{range}', 'SicboController@storeBet');
    Route::post('/sicbo/bet/cancelMulti/{table}/{range}', 'SicboController@cancelMulti');
    Route::post('/sicbo/actionlogs/store/{table}/{range}', 'SicboController@actionLogs');

    Route::post('/paigow/bet/store/{table}/{range}','PaigowController@storeBet');
    Route::post('/paigow/bet/cancelMulti/{table}/{range}', 'PaigowController@cancelMulti');
    Route::post('/paigow/actionlogs/store/{table}/{range}', 'PaigowController@actionLogs');
    ////end test ettong

    // Route::get('/{table}/{range}/{multiplayer}', 'BaccaratController@init');
    Route::get('/{table}', 'BaccaratController@init');
    Route::get('/{table}/{game}', 'BaccaratController@init');
    // Route::get('/m/Baccarat/{table}/{range}/{multiplayer}', 'BaccaratController@initMobile');
    Route::get('/m/{table}', 'BaccaratController@initMobile');
    
    Route::get('/non/Baccarat/{table}/{range}/{multiplayer}', 'BaccaratController@initNonMobile');

    Route::post('/settings', 'BaccaratController@setUserConfig');

    // Route::post('/bet/store/{table}/{range}','BaccaratController@storeBet');
    Route::post('/bet/store/{table}/{range}','BaccaratController@testStore');
    Route::post('/bet/cancel/{table}/{range}','BaccaratController@testCancel');
    // Route::post('/bet/cancel/{table}/{range}','BaccaratController@cancel');

    // adding for the meantime to not disrupt
    Route::post('/bet/cancelMulti/{table}/{range}','BaccaratController@testCancel');

    Route::post('/get/totalBet','BaccaratController@getTotalBet');;
    Route::post('/get/totalWin','BaccaratController@getTotalWin');
    Route::post('/get/user', 'BaccaratController@getUser');
    Route::post('/get/users', 'BaccaratController@getUsers');
    Route::post('/get/winAll/{table}','BaccaratController@getAllWin');

    //Route::post('/betlogs/store/{table}/{range}', 'BaccaratController@storeBetLogs');
    Route::post('/actionlogs/store/{table}/{range}', 'BaccaratController@actionLogs');
    Route::post('/bet/delete', function() {
        return 1;
    });

    //Bet records web
    Route::match(array('GET','POST'),'/{table}/{range}/{multiplayer}/transferlogs', 'BaccaratController@getTransferLogs');
    Route::match(array('GET','POST'),'/{table}/{range}/{multiplayer}/betlogs', 'BaccaratController@getBetLogs');
    Route::match(array('GET','POST'),'/{table}/{range}/{multiplayer}/betlogsM', 'BaccaratController@getBetLogsMobile');
    Route::match(array('GET','POST'),'/{table}/{range}/{multiplayer}/gamehistory', 'BaccaratController@getGameHistory');

    //Mobile
    Route::match(array('GET','POST'),'m/Baccarat/{table}/{range}/{multiplayer}/transferlogs', 'BaccaratController@getTransferLogs');
    Route::match(array('GET','POST'),'m/Baccarat/{table}/{range}/{multiplayer}/betlogs', 'BaccaratController@getBetLogs');
    Route::match(array('GET','POST'),'m/Baccarat/{table}/{range}/{multiplayer}/betlogsM', 'BaccaratController@getBetLogsMobile');
    Route::match(array('GET','POST'),'m/Baccarat/{table}/{range}/{multiplayer}/gamehistory', 'BaccaratController@getGameHistory');

    Route::post('details/getDetails', 'BaccaratController@getDetails');

    // Video Settings
    Route::post('/settings/videoSetting', 'BaccaratController@setVideoSetting');
    
    //Dealer Image
    Route::post('/getDealerImg', 'BaccaratController@getDealerImg');
    
    Route::post('/setGameSettings', 'BaccaratController@setGameSettings');
});
