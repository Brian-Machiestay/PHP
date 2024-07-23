<?php

namespace app\controller;

use app\model\Candidate;
use support\Request;
use app\model\Client;
use app\model\Portfolio;
use app\model\Voter;
use app\model\Vote;
use Exception;

class VoteController
{
    public function vote(Request $request, int $id)
    {
        echo $id;
        $voter_id = $request->get('voter_id');
        $client = Client::getClientWithId($id);
        echo json($client);
        $voter = Voter::getVoterWithId($voter_id);
        if ($client == null) return Response('client does not exist', 400);
        if ($voter_id == null) return Response('voter does not exist', 400);
        if ($voter->client != $client) return Response('voter is not allowed in this poll', 400);
        if (!$client->publish) return Response('poll not open yet', 400);
        $data = [
            'candidate_id' => $request->post('candidate_id'),
            'portfolio_id' => $request->post('portfolio_id')
        ];
        $candidate = Candidate::getCandidate($client, $data['candidate_id']);
        if ($candidate == null) return Response('candidate does not exist', 400);
        $portfolio = Portfolio::getPortfolio($client, $data['portfolio_id']);
        if ($portfolio == null) return Response('portfolio does not exist', 400);
        if ($candidate->portfolio != $portfolio) return Response('candidate is not registered under this portfolio');
        echo json($portfolio->candidates);
        if ($portfolio == null) return Response('portfolio does not exist', 400);
        if (Vote::voted($voter, $portfolio)) return Response('sorry. you have already voted for a candidate under this portfolio', 400);
        try {
            $vote = $portfolio->votes()->create($data += ['client_id' => $client->id, 'voter_id' => $voter->id]);
            $vote->save();
            return Response('sucessful. Thankyou for letting your vote count');
        } catch (Exception $e) {
            echo $e;
            return Response('An error occurred. voting not successful', 400);
        }
    }

    public function results(Request $request) {
        $id = $request->get('id');
        $client = Client::getClientWithId($id);
        //echo json($client->user);
        //echo $client->preferences;
        $res = ['client_id' => $client->id, 'client_name' => $client->user->name];
        //$res += ['portfolios' => array()];
        foreach($client->portfolios as $pp) {
            $pp_data = [];
            $pp_data += ['id' => $pp->id, 'portfolio_name' => $pp->category];
            $res['portfolios'][$pp->id] = $pp_data;
            $res['portfolios'][$pp->id]['candidates'] = [];
            foreach($pp->candidates as $cc) {
                $res['portfolios'][$pp->id]['candidates'][$cc->id] = ['id' => $cc->id, 'candidate_name' => $cc->user->name, 'vote_count' => Vote::voteCount($cc, $pp)];
            }
        }
        return json($res);
    }

}
