<?php

namespace app\controller;

use support\Request;
use support\Response;
use Tinywan\Jwt\JwtToken;
use Tymon\JWTAuth\Claims\JwtId;

class TestController
{
    public function index(Request $request)
    {
        $credentials = ['name' => 'kofi', 'id' => 1];
        $token = JwtToken::generateToken($credentials);
        echo json_encode($token);
        //$id = JwtToken::getCurrentId();
        //echo $id;
        return Response(json_encode($token))->header('Authorization', 'Bearer '.$token['access_token']);
    }

    public function testAuth(Request $request) {
        $token = $request->header('Authorization');
        return json_encode(JwtToken::getCurrentId());
    }

}
