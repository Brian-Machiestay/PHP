<?php

namespace app\controller;

use support\Request;
use app\model\Client;
use app\model\Preferences;
use support\Response;

class ClientController
{
    public function client(Request $request)
    {
        $name = $request->post('name');
        if ($name == null) return Response('name field cannot be empty', 400);
        $client = Client::getClientWithName($name);
        if ($client != null) {
            return Response('name already exists', 400);
        }
        $client = new Client(['name' => $name]);
        $client->save();
        $preference = new Preferences(['allowcandidates' => false, 'allowadmins' => false, 'client_id' => $client->id]);
        $preference->save();
        return json($client);
    }

    public function clients(Request $resquest) {
        $allClients = Client::getAllClients();
        return json($allClients);
    }

}
