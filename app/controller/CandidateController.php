<?php

namespace app\controller;

use app\model\Client;
use app\model\Portfolio;
use app\model\User;
use Exception;
use support\Request;
use support\Db;
use support\Response;
use Shopwwi\WebmanAuth\Facade\Auth as Authenticate;

class CandidateController
{
    public function addCandidate(Request $request)
    {
        //$id = $request->get('id');
        //$client = Client::getClientWithId($id);
        $usr = Authenticate::user();
        $client = $usr->client;
        $data = [
            'portfolio_id' => $request->post('portfolio_id'),
            'name' => $request->post('name'),
            'email' => $request->post('email')
        ];
        echo json($data);
        foreach ($data as $dt) if ($dt == null) return Response('some of the fields are empty', 400);
        $pp = Portfolio::getPortfolio($client, $data['portfolio_id']);
        if ($pp == null) return Response('portfolio does not exist', 400);
        $user = User::getUserWithEmail($data['email']);
        if ($user != null) return  Response('account already exists');

        try {
            $candidate = $client->candidates()->create(['portfolio_id' => $data['portfolio_id']]);
            $candidate->save();
            $usr = User::create(['email' => $data['email'], 'name' => $data['name'], 'candidate_id' => $candidate->id]);
            $usr->save();
            return json(['candidate_id' => $candidate->id]);
        } catch (Exception $e) {
            echo $e;
            DB::rollBack();
            return Response('Could not create candidate, an error occurred', 500);
        }
        return json([]);
    }

    public static function retrieveCandidates(Request $request) {
        //$id = $request->get('id');
        //$client = Client::getClientWithId($id);
        $usr = Authenticate::user();
        $client = $usr->client;
        $candidates = $client->candidates;
        return json($candidates);
    }

}
