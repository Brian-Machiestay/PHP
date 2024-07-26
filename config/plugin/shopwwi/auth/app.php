<?php
/**
 *-------------------------------------------------------------------------p*
 *
 *-------------------------------------------------------------------------h*
 * @copyright  Copyright (c) 2015-2022 Shopwwi Inc. (http://www.shopwwi.com)
 *-------------------------------------------------------------------------c*
 * @license    http://www.shopwwi.com        s h o p w w i . c o m
 *-------------------------------------------------------------------------e*
 * @link       http://www.shopwwi.com by 象讯科技 phcent.com
 *-------------------------------------------------------------------------n*
 * @since      shopwwi象讯·PHP商城系统Pro
 *-------------------------------------------------------------------------t*
 */
 return [
     'enable' => true,
     'app_key' => 'base64:N721v3Gt2I58HH7oiU7a70PQ+i8ekPWRqwI+JSnM1wo=',
     'guard' => [
         'client' => [
             'key' => 'id',
             'field' => ['id','password','email'],
             'num' => 0,
             'model'=> app\model\User::class
         ]
     ],
     'jwt' => [
         'redis' => false,
         // 算法类型 ES256、HS256、HS384、HS512、RS256、RS384、RS512
         'algorithms' => 'HS256',
         // access令牌秘钥
         'access_secret_key' => 'w5LgNx5luRRjmamZFSqz3cPHOp9KuQPExlvgi18DN4SdnSI9obcVEhiZVE0NIIC7',
         // access令牌过期时间，单位秒。默认 2 小时
         'access_exp' => 36000,
         // refresh令牌秘钥
         'refresh_secret_key' => 'w5LgNx5luRRjmamZFSqz3cPHOp9KuQPExlvgi18DN4SdnSI9obcVEhiZVE0NIIC7',
         // refresh令牌过期时间，单位秒。默认 7 天
         'refresh_exp' => 72000,
         // 令牌签发者
         'iss' => 'webman',
         // 令牌签发时间
         'iat' => time(),

         /**
          * access令牌 RS256 私钥
          * 生成RSA私钥(Linux系统)：openssl genrsa -out access_private_key.key 1024 (2048)
          */
         'access_private_key' => <<<EOD
-----BEGIN RSA PRIVATE KEY-----
...
-----END RSA PRIVATE KEY-----
EOD,
         /**
          * access令牌 RS256 公钥
          * 生成RSA公钥(Linux系统)：openssl rsa -in access_private_key.key -pubout -out access_public_key.key
          */
         'access_public_key' => <<<EOD
-----BEGIN PUBLIC KEY-----
...
-----END PUBLIC KEY-----
EOD,

         /**
          * refresh令牌 RS256 私钥
          * 生成RSA私钥(Linux系统)：openssl genrsa -out refresh_private_key.key 1024 (2048)
          */
         'refresh_private_key' => <<<EOD
-----BEGIN RSA PRIVATE KEY-----
...
-----END RSA PRIVATE KEY-----
EOD,
         /**
          * refresh令牌 RS256 公钥
          * 生成RSA公钥(Linux系统)：openssl rsa -in refresh_private_key.key -pubout -out refresh_public_key.key
          */
         'refresh_public_key' => <<<EOD
-----BEGIN PUBLIC KEY-----
...
-----END PUBLIC KEY-----
EOD,
     ],
 ];
