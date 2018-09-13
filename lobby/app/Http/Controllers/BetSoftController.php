<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BetSoftController extends Controller
{
    /**
     *
     */
    public function index()
    {
        return view('index-sample');
    }

    /**
     * Authenticate user into betsoft server
     *
     * @param Request $request
     * @return string
     */
    public function token(Request $request)
    {
        $token = $this->generateToken();
        app('db')->table('users')
            ->where('id', $request->user()->id)->update([
                'bsg_token' => $token
            ]);

        $bank = app('db')->table('vendors')->where('id', app('auth')->user()->vendor_id)->first();

        $response = ['payload' => $token, 'bank' => $bank->bsg_bank_id];

        return response()->json($response);
    }

    /**
     * Generate token for bet soft
     *
     * @param int $length
     * @return string
     */
    public function generateToken($length = 60)
    {
        do {
            $token = str_random($length);
        } while (app('db')->table('users')->where('bsg_token', $token)->first());

        return $token;
    }
}
