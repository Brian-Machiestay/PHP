<?php
namespace app\middleware;

use Webman\MiddlewareInterface;
use Webman\Http\Response;
use Webman\Http\Request;

class AccessControl implements MiddlewareInterface
{
    public function process(Request $request, callable $handler) : Response
    {
        // If it is an OPTIONS request, return an empty response, otherwise continue with the request and get a response
        $response = $request->method() == 'OPTIONS' ? response('') : $handler($request);
        //echo 'this was called';

        // Add CORS-related HTTP headers to the response
        //echo $request->method();
        //echo $request->header('origin');
        $response->withHeaders([
            'Access-Control-Allow-Credentials' => 'false',
            'Access-Control-Allow-Origin' => 'http://localhost:3000',
            'Access-Control-Allow-Methods' => $request->header('access-control-request-method', '*'),
            'Access-Control-Allow-Headers' => $request->header('access-control-request-headers', '*'),
        ]);

        return $response;
    }
    
}
