<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


use DB;
use Auth;
use Carbon\Carbon;

use App;
use Hash;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class userController extends Controller
{
    //
    //
    
    public function createTestUser(Request $request)
    {
        $currUser = app('db')->connection('nihtan_api')->table('users')->where('id',Auth::user()->id)->first();

        $username = "test_".$currUser->user_name;

        if(app('db')->connection('nihtan_api')->table('users')->where('user_name',$username)->first()) 
        {
        	//user exist
        	//vendor 1 test
        	//5 testCasino
        	//2 ssang2x 
        	//4 galaxy 
        	// echo $currUser->vendor_id;
        	// return;

        	$id = app('db')->connection('nihtan_api')->table('users')->where('user_name',$username)->first()->id;
    		Auth::loginUsingId($id, true);

    		// return header("refresh:2;url=http://10.1.10.231:8003/");
        }
        else {
        	//user doesnt exist

        	// echo $currUser->vendor_id;
        	// return;

        	$db = app('db')->connection('nihtan_api')->table('users')->insert([
			    'user_name' => $username,
			    'user_id' => $username,
			    'password' => Hash::make('test'),
			    'money' => 1000000,
			    'created_ip' => $request->ip(),
			    'vendor_id' => 1,
			    'user_type' => 'TC',
			    'config' => $currUser->config
			]);
        	echo "user does not exists";
        }

    }
}
