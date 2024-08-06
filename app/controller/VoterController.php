<?php

namespace app\controller;

use support\Request;
use app\model\Client;
use app\model\User;
use support\Db;
use Exception;
use support\Response;
use Shopwwi\WebmanAuth\Facade\Auth as Authenticate;
class VoterController
{
    public function addVoter(Request $request)
    {
        //$id = $request->get('id');
        //$client = Client::getClientWithId($id);
        $usr = Authenticate::user();
        $client = $usr->client;
        $data = [
            'name' => $request->post('name'),
            'email' => $request->post('email'),
        ];
        if ($data['name'] == null || $data['email'] == null) return Response('some fields are missing', 400);
        if (User::getUserWithEmail($data['email']) != null) return Response('account already exist', 400);

        try {
            $voter = $client->voters()->create();
            $usr = User::create(['email' => $data['email'], 'name' => $data['name'], 'voter_id' => $voter->id]);
            $voter->save();
            $usr->save();
            return json(['voter_id' => $voter->id]);
        } catch(Exception $e) {
            echo $e;
            DB::rollBack();
            return Response('An error ocurred. Could not add voter', 500);
        }

        return json([]);
    }

    public function retrieveVoters(Request $request) {
        //$id = $request->get('id');
        //$client = Client::getClientWithId($id);
        $usr = Authenticate::user();
        $client = $usr->client;
        $res = array();
        foreach($client->voters as $vt) {
            $vt_res = ['voter_id' => $vt->id, 'voter_name' => $vt->user->name, 'voter_email' => $vt->user->email];
            array_push($res, $vt_res);
        }
        return json($res);
    }

}
