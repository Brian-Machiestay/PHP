<?php

namespace app\controller;

use support\Request;
use app\model\Client;
use app\model\User;
use support\Db;
use Exception;
use support\Response;

class VoterController
{
    public function addVoter(Request $request)
    {
        $id = $request->get('id');
        $client = Client::getClientWithId($id);
        $data = [
            'name' => $request->post('name'),
            'email' => $request->post('email'),
        ];
        if ($data['name'] == null || $data['email'] == null) return Response('some fields are missing');
        if (User::getUserWithEmail($data['email']) != null) return Response('account already exist');
        DB::beginTransaction();
        try {
            $voter = $client->voters()->create();
            $usr = User::create(['email' => $data['email'], 'name' => $data['name'], 'voter_id' => $voter->id]);
            $voter->save();
            $usr->save();
            DB::commit();
            return json(['voter_id' => $voter->id]);
        } catch(Exception $e) {
            echo $e;
            DB::rollBack();
            return Response('An error ocurred. Could not add voter');
        }

        return json([]);
    }

    public function retrieveVoters(Request $request) {
        $id = $request->get('id');
        $client = Client::getClientWithId($id);
        return json($client->voters);
    }

}
