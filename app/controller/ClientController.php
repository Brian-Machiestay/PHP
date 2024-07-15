<?php

namespace app\controller;

use support\Request;
use app\model\Client;


class ClientController
{
    public function client(Request $request)
    {
        $client = new Client(['name' => 'MTN']);
        $existing_client = Client::where('id', 1)->first();
        
        return json(['msg' => 'we are trying this api']);
    }

    public function view(Request $request)
    {
        return view('index/view', ['name' => 'webman']);
    }

    public function json(Request $request)
    {
        return json(['code' => 0, 'msg' => 'ok']);
    }

}
