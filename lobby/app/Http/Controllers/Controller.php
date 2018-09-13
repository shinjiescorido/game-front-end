<?php

namespace App\Http\Controllers;

use App\Nihtan\Security\Cryptor;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use GuzzleHttp\Client;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected $client = null;

    /**
     * Controller constructor.
     */
    public function __construct()
    {
        $this->client = new Client();
    }

    /**
     * Return user credits
     *
     * @return float|int
     */
    public function getUserCredits()
    {
        $vendor = app('db')->table('vendors')->where('id', app('auth')->user()->vendor_id)->first();

        app('log')
            ->info('CREDIT: User -> '. app('auth')->user()->user_id . ', Type -> ' . $vendor->integration_type);

        app('log')->info('VENDOR: Id -> '. $vendor->id . ', Name -> ' . $vendor->vendor_name);

        if ($vendor->integration_type == 'seamless') {
            $temp = json_encode([
                'user_id' => app('auth')->user()->user_id,
                'user_name' => app('auth')->user()->user_name,
                'vendor_name' => $vendor->vendor_name,
            ]);

            $hash = '?hash=' . hash_hmac('sha256', $temp, $vendor->secret_key);

            try {
                $response = (string) $this->client
                ->request('post', env('API_URL') . '/api/check' . $hash, [
                    'headers' => ['Content-Type' => 'application/json'],
                    'body' => $temp
                ])->getBody();

                $response = json_decode($response);
                
                app('log')->info('api response'. json_encode($response));

                return is_float($response) ? (float) $response : (int) $response;
            }
            catch (BadResponseException $error) {
                app('log')->info((string) $error);
                return 0;
            }
        }

        return app('db')->table('users')->where('id', app('auth')->user()->id)->first()->money;
    }
}
