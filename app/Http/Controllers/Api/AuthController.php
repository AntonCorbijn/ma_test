<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Auth;
use Validator;
use DB;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->all();

        $this->validate($request, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed'
        ]);

        User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        return response()->json(['status' => 'success']);
    }

    public function login(Request $request)
    {
        $data = $request->all();

        $this->validate($request, [
            'username' => 'required|string|email|max:255',
            'password' => 'required|string|min:6'
        ]);

        if (Auth::attempt(['email' => $data['username'], 'password' => $data['password']])) {
            $client = \Laravel\Passport\Client::where('password_client', 1)->first();

            $params = [
                'grant_type' => 'password',
                'client_id'     => $client->id,
                'client_secret' => $client->secret,
                'username' => $data['username'],
                'password' => $data['password'],
            ];

            $request = Request::create('/oauth/token', 'POST', $params);
            $response =  app()->handle($request);

            return response()->json(
                [
                    'status'    =>      'success',
                    'message'   =>      'Login Success',
                    'content'   =>       json_decode($response->getContent(), true)
                ], 200
            );
        } else {
            return response()->json(
                [
                    'status'    =>      'failure',
                    'message'   =>      'Invalid Parameter.',
                    'errors'   =>      [ 'Invalid username or password' ]
                ],  422
            );
        }
    }

    public function logout()
    {
        $accessToken = Auth::user()->token();

        $refreshToken = DB::table('oauth_refresh_tokens')
            ->where('access_token_id', $accessToken->id)
            ->update([
                'revoked' => true
            ]);

        $accessToken->revoke();

        return response()->json(
            [
                'status'    =>      'success',
            ],  200
        );
    }
}
