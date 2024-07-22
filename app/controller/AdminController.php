<?php

namespace app\controller;

use support\Request;
use support\Db;
use app\model\Administrator;
use app\model\Client;
use app\model\User;
use Exception;

class AdminController
{
    public function addAdmin(Request $request)
    {
        $id = $request->get('id');
        $client = Client::getClientWithId($id);
        if ($id == null) return Response('client does not exist', 400);
        $data = [
            'email' => $request->post('email'),
            'level' => $request->post('level'),
            'name' => $request->post('name')
        ];
        foreach($data as $dt) {
            if ($dt == null) return Response('some fields are missing', 400);
        }
        $usr = User::getUserWithEmail($data['email']);
        if ($usr != null) return Response('This email account already exists');
        if ($data['level'] != 'basic' && $data['level'] != 'principal') return Response("level must be either 'basic' or 'principal'");
        DB::beginTransaction();
        try{
            $admin = $client->administrators()->create($data);
            $usr = User::create(['email' => $data['email'], 'administrator_id' => $admin->id, 'name' => $data['name']]);
            $admin->save();
            $usr->save();
            DB::commit();
        } catch(Exception $e) {
            DB::rollBack();
            echo $e;
        }

        return json(['admin_id' => $admin->id]);
    }

    public function getAdmins(Request $request) {
        $id = $request->get('id');
        $client = Client::getClientWithId($id);
        echo $client;
        $admins = $client->administrators;
        echo json($admins);
        return json($admins);
    }

}
