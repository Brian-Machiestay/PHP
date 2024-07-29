<?php

namespace app\controller;

use support\Request;

class RootController
{
    public function index(Request $request)
    {
        return view('index/index');
    }

}
