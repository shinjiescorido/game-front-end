<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class KaGaController extends Controller
{

    /**
    * @return $this
    */
    public function test()
    {
      $parameters = [
        'accessKey' => env('KAGA_ACCESS_KEY'),
        'partnerName' => env('KAGA_PARTNER_NAME'),
        'language' => 'en',
        'randomId' => random_int(1, 64000)
      ];

      $hash = hash_hmac('SHA256', json_encode($parameters), env('KAGA_SECRET_KEY'));

      $response = (string) $this->client
      ->request('post', env('KAGA_URL') . '/kaga/gameList?hash=' . $hash, [
        'body' => json_encode($parameters),
        'headers'  => ['content-type' => 'application/json', 'Accept' => 'application/json'],
        ])->getBody();

        return view('kaga')->with('kaga', $response);
      }

    /**
     *
     */
    public function index()
    {
        $parameters = [
            'accessKey' => env('KAGA_ACCESS_KEY'),
            'partnerName' => env('KAGA_PARTNER_NAME'),
            'language' => 'en',
            'randomId' => random_int(1, 64000)
        ];

        $hash = hash_hmac('SHA256', json_encode($parameters), env('KAGA_SECRET_KEY'));

        $response = $this->client->request('post', env('KAGA_GAME_SERVER') . '/kaga/gameList?hash=' . $hash, [
            'body' => json_encode($parameters),
            'headers'  => ['content-type' => 'application/json', 'Accept' => 'application/json'],
        ]);


        return response()->json(json_decode((string) $response->getBody()));
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
                'kaga_token' => $token
            ]);

        $response = ['payload' => $token, 'access' => env('KAGA_ACCESS_KEY')];

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
        } while (app('db')->table('users')->where('kaga_token', $token)->first());

        return $token;
    }
}
