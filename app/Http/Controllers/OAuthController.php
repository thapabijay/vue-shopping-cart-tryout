<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Exception;
use AppHttpControllersController;
use IlluminateSupportFacadesAuth;
use LaravelSocialiteFacadesSocialite;


class OAuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('guest');
    }

    protected $providers = [
        'facebook',
        'google',
        'twitter'
    ];

    /**
     * Show the social login page
     *
     * @return IlluminateContractsViewFactory|IlluminateViewView
     */
    public function show()
    {
        return view('oauth.social');
    }

    /**
     * Redirect to provider for authentication
     *
     * @param $driver
     * @return mixed
     */
    public function redirectToProvider($provider)
    {
        if( ! $this->isProviderAllowed($provider) ) {
            return $this->sendFailedResponse("{$provider} is not currently supported");
        }

        try {
            return Socialite::driver($provider)->redirect();
        } catch (Exception $e) {
            // You should show something simple fail message
            return $this->sendFailedResponse($e->getMessage());
        }
    }

    /**
     * Handle response of authentication redirect callback
     *
     * @param $driver
     * @return IlluminateHttpRedirectResponse
     */
    public function handleProviderCallback( $driver )
    {
        try {
            $user = Socialite::driver($driver)->user();
        } catch (Exception $e) {
            return $this->sendFailedResponse($e->getMessage());
        }

        // check for email in returned user
        // return empty( $user->email )
        //     ? $this->sendFailedResponse("No email id returned from {$driver} provider.")
        //     : $this->loginOrCreateAccount($user, $driver);

        $authUser = $accountService->findOrCreate(
            $user,
            $provider
        );

        auth()->login($authUser, true);

        return redirect()->to('/home');
    }

    /**
     * Send a successful response
     *
     * @return IlluminateHttpRedirectResponse
     */
    protected function sendSuccessResponse()
    {
        return redirect()->intended('home');
    }

    /**
     * Send a failed response with a msg
     *
     * @param null $msg
     * @return IlluminateHttpRedirectResponse
     */
    protected function sendFailedResponse($msg = null)
    {
        return redirect()->route('social.login')
            ->withErrors(['msg' => $msg ?: 'Unable to login, try with another provider to login.']);
    }

    protected function loginOrCreateAccount($providerUser, $driver)
    {
        // check for already has account
        $user = User::where('email', $providerUser->getEmail())->first();

        // if user already found
        if( $user ) {
            // update the avatar and provider that might have changed
            $user->update([
                'avatar' => $providerUser->avatar,
                'provider' => $driver,
                'provider_id' => $providerUser->id,
                'access_token' => $providerUser->token
            ]);
        } else {
            // create a new user
            $user = User::create([
                'name' => $providerUser->getName(),
                'email' => $providerUser->getEmail(),
                'avatar' => $providerUser->getAvatar(),
                'provider' => $driver,
                'provider_id' => $providerUser->getId(),
                'access_token' => $providerUser->token,
                // user can use reset password to create a password
                'password' => ''
            ]);
        }

        // login the user
        Auth::login($user, true);

        return $this->sendSuccessResponse();
    }

    /**
     * Check for provider allowed and services configured
     *
     * @param $driver
     * @return bool
     */
    private function isProviderAllowed($driver)
    {
        return in_array($driver, $this->providers) && config()->has("services.{$driver}");
    }
}
