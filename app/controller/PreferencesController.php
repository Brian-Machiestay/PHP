<?php

namespace app\controller;

use app\model\Client;
use support\Request;
use Rakit\Validation\Validator;
use support\Response;
use app\model\Preferences;

class PreferencesController
{
    public function updatePreferences(Request $request)
    {
        $id = $request->get('id');
        $client = Client::getClientWithId($id);
        if ($client == null) {
            return Response('client does not exist', 400);
        }
        $validator  = new Validator();
        $validation = $validator->make(
            $request->all(),
            [
                'allowCandidates' => 'required',
                'allowAdmins' => 'required',
            ]
        );
        $validation->validate();
        if ($validation->fails()) return Response('some fields are missing', 400, []);
        //echo $request->post('allowCandidates');
        //echo $request->post('allowAdmins');
        $preferences = Preferences::updateClientPreferences(
            $request->post('allowCandidates'),  
            $request->post('allowAdmins'), 
            $id);
        return json($preferences);
    }

    public function retrieveClientPreferences(Request $request) {
        $id = $request->get('id');
        $client = Client::getClientWithId($id);
        if ($client == null) return Response('client does not exist', 400);
        return json(Preferences::getClientPreferences($id));
    }

}
