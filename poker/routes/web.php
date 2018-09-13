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

// Route::get('/test/{table}/{range}', function($table, $range) {
Route::get('/test', function () {
    Auth::loginUsingId(2910,true);
    /*return view('test-bet');*/
    // return header("refresh:2;url=http://10.1.10.231:8004/m/Poker/".$table."/".$range."");
});

Route::get('/rejected', 'PokerController@checkReject');

Route::group(['middleware' => ['web', 'auth']], function () {
    Route::post('/settings', 'PokerController@setUserConfig');
    Route::post('/checkTable', 'PokerController@checkTable');

    Route::get('/{table}', 'PokerController@index');
    // Route::post('/bet/store/{table}/{range}', 'PokerController@store');
    Route::post('/bet/store/{table}/{range}', 'PokerController@testStore');
    // Route::post('/bet/cancel/{table}/{range}', 'PokerController@cancel');
    Route::post('/bet/cancel/{table}/{range}', 'PokerController@testCancel');

    Route::post('/get/winAll/{table}','PokerController@getAllWin');
  	Route::post('/get/user','PokerController@getUser');
  	Route::get('/m/Poker/get/user','PokerController@getUser');

    // adding for the meantime to not disrupt
    Route::post('/bet/cancelMulti/{table}/{range}','PokerController@testCancel');

    // Fold / Check
    Route::post('bet/setFoldCheck/{table}','PokerController@setFoldCheck');

    //Route::post('/betlogs/store/{table}/{range}', 'PokerController@storeBetLogs');
    Route::post('/actionlogs/store/{table}/{range}', 'PokerController@actionLogs');

    Route::get('/m/Poker/{table}/{range}', 'PokerController@indexMobile');
    Route::get('/m/Poker/{table}/{range}/{type}', 'PokerController@indexMobile');

    Route::get('/non/Poker/{table}/{range}', 'PokerController@indexNonMobile');
    Route::get('/non/Poker/{table}/{range}/{type}', 'PokerController@indexNonMobile');

    //Bet records web
    Route::match(array('GET','POST'),'/{table}/{range}/transferlogs', 'PokerController@getTransferLogs');
    Route::match(array('GET','POST'),'/{table}/{range}/betlogs', 'PokerController@getBetLogs');
    Route::match(array('GET','POST'),'/{table}/{range}/gamehistory', 'PokerController@getGameHistory');

    //Mobile
    Route::match(array('GET','POST'),'m/Poker/{table}/{range}/transferlogs', 'PokerController@getTransferLogs');
    Route::match(array('GET','POST'),'m/Poker/{table}/{range}/betlogs', 'PokerController@getBetLogs');
    Route::match(array('GET','POST'),'m/Poker/{table}/{range}/gamehistory', 'PokerController@getGameHistory');

    Route::post('details/getDetails', 'PokerController@getDetails');

    // Video Settings
    Route::post('/settings/videoSetting', 'PokerController@setVideoSetting');

    //Dealer Image
    Route::post('/getDealerImg', 'PokerController@getDealerImg');
    Route::post('/setGameSettings', 'PokerController@setGameSettings');
});
