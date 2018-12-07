<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Route;

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

    public function login(Request $request){
        $params =$request->all();  
        $user =   User::where("username",$params["username"])
                    ->orWhere("email",$params["username"])
                    ->first();   

        // if($user && !$user->is_active):
        //     return response()->json(array('code' =>  422,'message' =>  "The account is deactivated. Please contact the system administrator"), 500);       
        // endif;        
        $tokenRequest = $request->create('/oauth/token','POST',[    
            'username' => $params["username"],
            'password' => $params["password"]    
        ]);       
        
        $request->request->add([
            'client_id' => 2,                
            'client_secret' => '6cxGmChLKfWjScpGpLDK5CKbQd0G8nXdcrxs25Ob',
            'grant_type' => 'password',       
            'scope' => '', 
        ]);      
    
        try{        
            $response = Route::dispatch($tokenRequest);
            
            $auth = json_decode($response->getContent());  
            
            if(isset($auth->error)):
                return response()->json(array('code' =>  422,'message' =>  $auth->message), 500); 
            endif;
            return response()->json([
                'token' => $auth->access_token,
                'user' => $user,
                'status' => 200
            ],200);            
 
        } catch (\Exception $e) {
            return response()->json(array('code' =>  401,'message' =>  $e->getMessage()), 401);
        }
    }

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }
}
