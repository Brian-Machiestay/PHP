<?php

namespace app\controller;

use app\model\Client;
use app\model\Portfolio;
use app\model\User;
use support\Request;
use support\Db;
use PhpOffice\PhpSpreadsheet\Calculation\MathTrig\Exp;
use support\Response;

class CandidateController
{
    public function addCandidate(Request $request)
    {
        $id = $request->get('id');
        $client = Client::getClientWithId($id);
        $data = [
            'portfolio_id' => $request->post('portfolio_id'),
            'name' => $request->post('name'),
            'email' => $request->post('email')
        ];

        foreach ($data as $dt) if ($dt == null) return Response('some of the fields are empty', 400);
        $pp = Portfolio::getPortfolio($client, $data['portfolio_id']);
        if ($pp == null) return Response('portfolio does not exist', 400);
        DB::beginTransaction();
        try {
            $candidate = $client->candidates()->create(['portfolio_id' => $data['portfolio_id']]);
            $candidate->save();
            $usr = User::create(['email' => $data['email'], 'name' => $data['name'], 'candidate_id' => $candidate->id]);
            $usr->save();
            DB::commit();
            return json(['candidate_id' => $candidate->id]);
        } catch (Exp $e) {
            echo $e;
            return Response('Could not create candidate, an error occurred', 400);
        }
        return json([]);
    }

}
