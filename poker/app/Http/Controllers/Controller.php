<?php

namespace App\Http\Controllers;

use App\Nihtan\Security\Cryptor;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use GuzzleHttp\Exception\BadResponseException;
use GuzzleHttp\Client;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected $client = null;

    public function __construct()
    {
        $this->client = new Client();
    }

    /**
     * @param $parameters
     * @param $secret
     * @return string
     */
    public function hash($parameters, $secret)
    {
        return hash_hmac('sha256', $parameters, $secret);
    }

    /**
     * @param $type
     * @param $vendor
     * @param $userId
     * @param $data
     * @return bool
     */
    protected function transact($type, $vendor, $userId, $data)
    {
        if ($vendor->integration_type === 'seamless') {
            $data['id'] = $userId;
            $params = json_encode($data);
            $hash = '?hash=' . $this->hash($params, $vendor->secret_key);

            $response = $this->client
            ->request('post', env('API_URL') . "/api/transact/poker/$type" . $hash, [
                'headers' => ['Content-Type' => 'application/json'],
                'body' => $params
            ]);

            $response = json_decode($response->getBody(), true);
            return $response['status'] == 'ok';
        }  else {
            if($type === 'cancel') {
                // $ret = $this->setMoney($type, $userId, $data['amount']);
                // if($ret) return true;
                // else return false;
                return true;
            }

            return true;
        }
    }
    
    public function setMoney ($type, $userId, $amount) {

        $vendor = app('db')->table('vendors')->where('id', app('auth')->user()->vendor_id)->first();

        if ($vendor->integration_type == 'seamless') {
            return true;            
        }

        $exec = $type == 'bet' ? 'decrement' : 'increment';

        if ($this->getUserCredits() >= $amount && $exec == 'decrement' || $exec == 'increment') {
            app('log')->info(abs($amount) . ' ' . $exec . ' ' . $userId);
            app('db')->table('users')->where('id', $userId)
                ->{$exec}('money', abs($amount));

            return true;
        }

        return false;
    } 
    
    /**
     * @param $type
     * @param $userId
     * @param arraty $data
     */
    public function checking($type, $userId, $data)
    {
        $fail = false;
        $data['type'] =  $type;
        
        if($type === 'bet') {
            if(isset($data['prevBetType']) &&  $data['prevBetType'] != $data['slave']) {
                $fail = true;
                $data['prevBets'] = [];
            }

            if($this->getUserCredits() < $data['amount']) {
                $fail = true;
            }

            if($fail) {
                $return = [
                    'data' => count($data['prevBets']) > 0 ? $data['prevBets'] : [],
                    'fail' => 1,
                    'money' => $this->getUserCredits() 
                ];
                
                return $return;
            }
        } else {
            if(isset($data['prevBetType']) &&  $data['prevBetType'] != $data['slave']) {
                return ['comment' => 'continue'];
            }
        }
       
        $ret = $this->setMoney($data['type'], $userId, $data['amount']);

        if($ret) return true;
        return false;
    }
    /**
     * @param $table
     * @param array $data
     * @param $userId
     * @param $roundId
     */
    public function insertOrUpdate($table, array $data, $userId, $roundId)
    {
        $result = app('db')->table($table)
            ->where('user_id', $userId)
            ->where('round_id', $roundId)
            ->first();

        if (!$result) {
            app('db')->table($table)->insert($data);
            return ;
        }

        app('db')->table($table)->where('id', $result->id)->update($data);
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
            try {
                $data = json_encode([
                    'user_id' => app('auth')->user()->user_id,
                    'user_name' => app('auth')->user()->user_name,
                    'vendor_name' => $vendor->vendor_name,
                ]);

                $hash = '?hash=' . $this->hash($data, $vendor->secret_key);

                $response = (string) $this->client
                    ->request('post', env('API_URL') . '/api/check' . $hash, [
                        'headers' => ['Content-Type' => 'application/json'],
                        'body' => $data
                    ])->getBody();

                $response = json_decode($response);
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
