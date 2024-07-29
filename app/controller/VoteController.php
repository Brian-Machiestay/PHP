<?php

namespace app\controller;

use app\model\Candidate;
use support\Request;
use app\model\Client;
use app\model\Portfolio;
use app\model\Voter;
use app\model\Vote;
use Exception;
use support\Db;
use Shopwwi\WebmanAuth\Facade\Auth as Authenticate;
class VoteController
{
    public function vote(Request $request, int $id)
    {
        //echo $id;
        $voter_id = $request->get('voter_id');
        $client = Client::getClientWithId($id);
        //echo json($client);
        //$data = json($request->post());
        $voter = Voter::getVoterWithId($voter_id);
        if ($client == null) return Response('client does not exist', 400);
        if ($voter_id == null) return Response('voter does not exist', 400);
        if ($voter->client != $client) return Response('voter is not allowed in this poll', 400);
        if (!$client->publish) return Response('poll not open yet', 400);
        /*
        $data = [
            'candidate_id' => $request->post('candidate_id'),
            'portfolio_id' => $request->post('portfolio_id')
        ];
        */
        $data = $request->post();
        echo var_dump($data);
        DB::beginTransaction();
        foreach($data as $dd) {
            echo json($dd);
            $can = $dd['candidate_id'];
            $portf = $dd['portfolio_id'];
            $candidate = Candidate::getCandidate($client, $can);
            if ($candidate == null) {
                DB::rollBack();
                return Response('candidate does not exist', 400);
            }
            $portfolio = Portfolio::getPortfolio($client, $portf);
            if ($portfolio == null) {
                DB::rollBack();
                return Response('portfolio does not exist', 400);
            }
            if ($candidate->portfolio != $portfolio) {
                DB::rollBack();
                return Response('candidate is not registered under this portfolio');
            }

            if (Vote::voted($voter, $portfolio)) {
                DB::rollBack();
                return Response('sorry. you have already voted for a candidate under one of the portfolios', 400);
            }
            try {
                $vote = $portfolio->votes()->create(['candidate_id' => $candidate->id, 'voter_id' => $voter->id]);
                $vote->save();
            } catch (Exception $e) {
                DB::rollBack();
                echo $e;
                return Response('An error occurred. voting not successful', 500);
            }
        }
        DB::commit();
        return Response('sucessful. Thankyou for letting your vote count');
    }

    public function results(Request $request) {
        //$id = $request->get('id');
        $usr = Authenticate::user();
        $client = $usr->client;
        //$client = Client::getClientWithId($id);
        //echo json($client->user);
        //echo $client->preferences;
        $res = ['client_id' => $client->id, 'client_name' => $client->user->name];
        //$res += ['portfolios' => array()];
        $res['portfolios'] = array();
        foreach($client->portfolios as $pp) {
            $pp_data = ['id' => $pp->id, 'portfolio_name' => $pp->category];
            $pp_data['candidates'] = array();
            foreach($pp->candidates as $cc) {
                $cc_data = ['id' => $cc->id, 'candidate_name' => $cc->user->name, 'vote_count' => Vote::voteCount($cc, $pp)];
                array_push($pp_data['candidates'], $cc_data);
            }
            array_push($res['portfolios'], $pp_data);
        }
        return json($res);
    }

    public function data (Request $request, $id) {
        //$id = $request->get('id');
        $client = Client::getClientWithId($id);

        $res = ['client_id' => $client->id, 'client_name' => $client->user->name];
        $res['portfolios'] = array();
        foreach($client->portfolios as $pp) {
            $pp_data = ['id' => $pp->id, 'portfolio_name' => $pp->category];
            $pp_data['candidates'] = array();
            foreach($pp->candidates as $cc) {
                $cc_data = ['id' => $cc->id, 'candidate_name' => $cc->user->name];
                array_push($pp_data['candidates'], $cc_data);
            }
            array_push($res['portfolios'], $pp_data);
        }
        return json($res);
    }
}
