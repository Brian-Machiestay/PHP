<?php

namespace app\model;

use support\Model;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

/**
 *
 */
class JwtClaims
{
    private string $key;
    private string $alg;
    private Array $config;

    function __construct()
    {
        $this->key = getenv('THUMBS_JWT_SECRET');
        $this->alg = getenv('THUMBS_JWT_ALG');
        $this->config = [
            'iss' => 'http://thumbs.com',
            'aud' => 'http://thumbs.com',
        ];
    }
    
    function getJwt(array $claims, int $exp) {
        $jwt = JWT::encode($this->config += ['claims' => $claims, 'exp' => time() + $exp], $this->key, $this->alg);
        return $jwt;
    }
    
    function getClaims(string $token) {
        $claims = JWT::decode($token, new Key($this->key, $this->alg));
        //var_dump($claims);
        $claimsObj = (array) $claims;
        return $claims->claims;
    }
}
