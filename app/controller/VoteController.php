<?php

namespace app\controller;

use app\model\Candidate;
use support\Request;
use app\model\Client;
use app\model\Portfolio;
use app\model\Voter;
use Exception;

class VoteController
{
    public function vote(Request $request, int $id)
    {
        echo $id;
        $voter_id = $request->get('voter_id');
        $client = Client::getClientWithId($id);
        $voter = Voter::getVoterWithId($voter_id);
        if ($client == null) return Response('client does not exist', 400);
        if ($voter_id == null) return Response('voter does not exist', 400);
        if ($voter->client != $client) return Response('voter is not allowed in this poll', 400);
        if (!$client->pulish) return Response('poll not open yet', 400);
        $data = [
            'candidate_id' => $request->post('candidate_id'),
            'portfolio_id' => $request->post('portfolio_id')
        ];
        $candidate = Candidate::getCandidate($client, $data['candidate_id'], );
        if ($candidate == null) return Response('candidate does not exist', 400);
        $portfolio = Portfolio::getPortfolio($client, $data['portfolio_id']);
        if ($portfolio == null) return Response('portfolio does not exist', 400);
        try {
            $vote = $portfolio->votes()->create($data += ['client_id' => $client->id]);
            $vote->save();
        } catch (Exception $e) {
            echo $e;
            return Response('An error occurred. voting not successful', 400);
        }
        return Response('sucessful. Thankyou for letting your vote count');
    }

}
