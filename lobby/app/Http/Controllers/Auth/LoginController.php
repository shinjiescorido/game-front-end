<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use App\Nihtan\Security\Cryptor;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function logout(Request $request)
    {
        $path = 'http://google.com';
        
        app('db')->connection('nihtan_api')->table('users')->where('id', app('auth')->user()->id)
        ->update([
            'token' => null
        ]);

        $mobile =$request->input('mobile', false);
        if ($request->user()) {
            $path = $request->user()->{($mobile ? 'mo' : 'pc') . '_redirect_url'};
            $vendor = app('db')->table('vendors')->where('id', $request->user()->vendor_id)->first();

            $temp = json_encode([
                'user_id' => app('auth')->user()->user_id,
                'user_name' => app('auth')->user()->user_name,
                'user_ip' => $request->ip(),
                'amount' => app('auth')->user()->money,
                'vendor_name' => $vendor->vendor_name,
                'pc_redirect' => $request->user()->pc_redirect_url,
                'mo_redirect' => $request->user()->mo_redirect_url,
                'callback_url' => $request->user()->transfer_callback_url
            ]);

            $hash = '?hash=' . hash_hmac('sha256', $temp, $vendor->secret_key);

            app('log')->info(json_encode($temp));

            $response = app('auth')->user()->money <= 0 && $vendor->integration_type !== 'transfer'
                ? null : (new Client())
                ->request('POST', env('API_URL') . '/api/transfer/cash-out' . $hash, [
                    'headers' => ['Content-Type' => 'application/json'],
                    'body' => $temp
                ]);

            if ($response ) {
                app('log')->info((string) $response->getBody());
            }

            app('auth')->logout();
        }

        return $path;
    }
}
