<?php

namespace app\controller;

use support\Request;
use app\model\Client;
use app\model\Preferences;
use app\model\User;
use PhpOffice\PhpSpreadsheet\Calculation\MathTrig\Exp;
use support\Db;
use support\Response;
/**
 * Client controller
 */
class ClientController
{
    /**
     * @function - creates a new Client
     * @param - request object
     */
    public function client(Request $request)
    {
        $data = [
            'name' => $request->post('name'),
            'email' => $request->post('email'),
            'password' => $request->post('password'),
        ];
        foreach($data as $key => $val) {
            if ($val == null) return Response('some fields are missing', 400);
        }

        $usr = User::getUserWithEmaill($data['email']);
        if ($usr != null) return Response('email already exists', 400);

        $client = Client::getClientWithName($data['name']);
        if ($client != null) return Response('name already exists', 400);

        DB::beginTransaction();
        try {
            $client = new Client(['name' => $data['name'], 'approved' => false]);
            $client->save();
            $usr = new User(['client_d' => $client->id, 'email' => $data['email'], 'password' => $data['password']]);
            $usr->save();
            $preference = new Preferences(['allowcandidates' => false, 'allowadmins' => false, 'client_id' => $client->id]);
            $preference->save();
            DB::commit();
            return json(['id'=> $client->id]);
        } catch (Exp $e) {
            echo $e;
            DB::rollBack();
            return Response('Could not create user, an error occurred', 500);
        }
        
    }


    public function clients(Request $resquest) {
        $allClients = Client::getAllClients();
        return json($allClients);
    }

}
