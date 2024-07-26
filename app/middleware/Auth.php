<?php
namespace app\middleware;

use Webman\MiddlewareInterface;
use Webman\Http\Response;
use Webman\Http\Request;

use Shopwwi\WebmanAuth\Facade\Auth as Authenticate;

class Auth implements MiddlewareInterface
{
    public function process(Request $request, callable $handler) : Response
    {
        $usr = Authenticate::guard('client')->user();
        if ($usr == null) return Response('Unauthorized', 401);
        return $handler($request);
    }
    
}
