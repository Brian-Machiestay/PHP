<?php

namespace app\controller;

use app\model\JwtClaims;
use support\Request;
use support\Response;
use UnexpectedValueException;
use LogicException;

class TestController
{

    public function index(Request $request)
    {
        $data = [
            'name' => 'brian',
            'id' => 2,
        ];
        $jwt = new JwtClaims();
        $token = $jwt->getJwt($data, 60);
        return json(['token' => $token]);
    }

    public function testAuth(Request $request) {
        $token = $request->get('t');
        $jwtDecoder = new JwtClaims();
        try {
            $decoded = $jwtDecoder->getClaims($token);
            return json(['data' => $decoded]);
        } catch (LogicException $e) {
            // errors having to do with environmental setup or malformed JWT Keys
            echo $e;
            return Response('The token is not valid', 400);
            
        } catch (UnexpectedValueException $e) {
            // errors having to do with JWT signature and claims
            echo $e;
            return Response('invalid token', 400);
        }
    }

}
