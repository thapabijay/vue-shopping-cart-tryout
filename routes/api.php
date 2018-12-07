<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::namespace('Api')->group(function () {
    Route::get('/users', function () {
        return response()->json(array('code' =>  401,'message' => "No authentication"), 404);
        //return App\Http\Resources\UserResource::collection(\DB::table('bl_details')->paginate(10));
    });
    Route::get('/photos', 'HomeController@getPhotos');
});

Auth::routes();


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
