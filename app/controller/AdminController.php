<?php

namespace app\controller;

use support\Request;

class AdminController
{
    public function index(Request $request)
    {
        return response(__CLASS__);
    }

}
