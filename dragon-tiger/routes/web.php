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

// Route::get('/test', function () {
//     Auth::loginUsingId(12);
// });
// Route::get('/test', function () {
Route::get('/test', function () {
    Auth::loginUsingId(4049,true);
});

Route::get('/test1', function () {
    Auth::loginUsingId(4045,true);
});

Route::get('/test2', function () {
    Auth::loginUsingId(4046,true);
});

Route::get('/test3', function () {
    Auth::loginUsingId(4047,true);
});

Route::get('/test4', function () {
    Auth::loginUsingId(4048,true);
});

Route::get('/test/dollar', function () {
    Auth::loginUsingId(1176,true);
});

Route::get('/rejected', 'DragonTigerController@checkReject');

Route::group(['middleware' => ['web', 'auth']], function () {
    Route::post('/settings', 'DragonTigerController@setUserConfig');
    
    //get junket users
    Route::post('/getJunket/{roomId}', 'DragonTigerController@getJunketUsers');
    Route::post('/checkPassword', 'DragonTigerController@checkPassword');
    Route::post('/updateRoom', 'DragonTigerController@setRoomInfo');
    Route::post('/get/users', 'DragonTigerController@getUsers');
    Route::post('/getJunketLogs', 'DragonTigerController@getJunketLogs');
    Route::post('/checkTable', 'DragonTigerController@checkTable');

    // Route::get('/{table}/{range}/{multiplayer}', 'DragonTigerController@init');
    Route::get('/{table}', 'DragonTigerController@init');
    Route::get('/{table}/{game}', 'DragonTigerController@init');
    Route::get('/m/Dragon-Tiger/{table}/{range}/{multiplayer}', 'DragonTigerController@initMobile');
    Route::get('/non/Dragon-Tiger/{table}/{range}/{multiplayer}', 'DragonTigerController@initNonMobile');

    Route::post('/get/totalBet','DragonTigerController@getTotalBet');;
    Route::post('/get/totalWin','DragonTigerController@getTotalWin');

    Route::post('/bet/store/{table}/{range}','DragonTigerController@testStore');
    // Route::post('/bet/store/{table}/{range}','DragonTigerController@storeBet');
    // Route::post('/bet/cancel/{table}/{range}','DragonTigerController@cancel');
    Route::post('/bet/cancel/{table}/{range}','DragonTigerController@testcancel');

    Route::post('/bet/cancelMulti/{table}/{range}','DragonTigerController@testcancel');
    //Route::post('/betlogs/store/{table}/{range}', 'DragonTigerController@storeBetLogs');

    Route::post('/get/winAll/{table}','DragonTigerController@getAllWin');
    Route::post('/get/user','DragonTigerController@getUser');

    Route::post('/actionlogs/store/{table}/{range}', 'DragonTigerController@actionLogs');
    //Bet records web
    Route::match(array('GET','POST'),'/{table}/{range}/{multiplayer}/transferlogs', 'DragonTigerController@getTransferLogs');
    Route::match(array('GET','POST'),'/{table}/{range}/{multiplayer}/betlogs', 'DragonTigerController@getBetLogs');
    Route::match(array('GET','POST'),'/{table}/{range}/{multiplayer}/gamehistory', 'DragonTigerController@getGameHistory');

    //Mobile
    Route::match(array('GET','POST'),'m/Dragon-Tiger/{table}/{range}/{multiplayer}/transferlogs', 'DragonTigerController@getTransferLogs');
    Route::match(array('GET','POST'),'m/Dragon-Tiger/{table}/{range}/{multiplayer}/betlogs', 'DragonTigerController@getBetLogs');
    Route::match(array('GET','POST'),'m/Dragon-Tiger/{table}/{range}/{multiplayer}/gamehistory', 'DragonTigerController@getGameHistory');

    Route::post('details/getDetails', 'DragonTigerController@getDetails');

    // Video Settings
    Route::post('/settings/videoSetting', 'DragonTigerController@setVideoSetting');

    //Dealer Image
    Route::post('/getDealerImg', 'DragonTigerController@getDealerImg');

    Route::post('/setGameSettings', 'DragonTigerController@setGameSettings');
});
