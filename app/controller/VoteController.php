<?php

namespace app\controller;

use app\model\Candidate;
use support\Request;
use app\model\Client;
use app\model\JwtClaims;
use app\model\Portfolio;
use app\model\Voter;
use app\model\Vote;
use app\queue\redis\Mail;
use Exception;
use support\Db;
use Webman\RedisQueue\Client as RedisClient;
use Shopwwi\WebmanAuth\Facade\Auth as Authenticate;
use support\Response;
use WebmanTech\LaravelHttpClient\Facades\Http;

//use app\queue\redis\Mail;
class VoteController
{
    public function vote(Request $request, string $id)
    {
        //echo $id;
        try {
            $token = $request->get('i');
            $client = Client::getClientWithId((int)$id);
        } catch (Exception $e) {
            return Response('client id must be a number and identity cannot be empty', 400);
        }

        try {
            $jwt = new JwtClaims();
            $voter_data = $jwt->getClaims($token);
            $voter_id = $voter_data->id;
        } catch (Exception $e) {
            echo $e;
            return Response('poll has ended', 400);
        }
        
        $voter = Voter::getVoterWithId($voter_id);
        if ($client == null) return Response('client does not exist', 400);
        if ($voter_id == null) return Response('voter does not exist', 400);
        if ($voter->client != $client) return Response('voter is not allowed in this poll', 400);
        if (!$client->publish) return Response('poll not open yet', 400);
       
        $data = $request->post();
        echo var_dump($data);
        $votes = [];
        foreach($data as $dd) {
            echo json($dd);
            $can = $dd['candidate_id'];
            $portf = $dd['portfolio_id'];
            $candidate = Candidate::getCandidate($client, $can);
            if ($candidate == null) {
                return Response('candidate does not exist', 400);
            }
            $portfolio = Portfolio::getPortfolio($client, $portf);
            if ($portfolio == null) {
                return Response('portfolio does not exist', 400);
            }
            if ($candidate->portfolio != $portfolio) {
                return Response('candidate is not registered under this portfolio');
            }

            if (Vote::voted($voter, $portfolio)) {
                return Response('sorry. you have already voted for a candidate under one of the portfolios', 400);
            }
            $vote = $portfolio->votes()->create(['candidate_id' => $candidate->id, 'voter_id' => $voter->id]);
                array_push($votes, $vote);
            }
        if ($voter_data->billing == 'yes') {
            echo 'we entered here';
            $payment_data = [
                'merchant_id' => getenv('MERCHANT_ID'),
                'transaction_id' => '000000000001',
                'desc' => 'complete the payment to cast your vote',
                'amount' => str_pad(strval($voter_data->amount), 12, '0', STR_PAD_LEFT),
                'redirect_url' => getenv('PAYMENT_REDIRECT_URL'),
                'email' => getenv('CUSTOMER_EMAIL')
            ];
            var_dump($payment_data);
            $res = Http::withHeaders([
                "Authorization" => "Basic ".base64_encode(getenv('API_USERNAME'). ':' . getenv('PAYMENT_API_KEY'))
            ])->post('https://checkout-test.theteller.net/initiate', $payment_data);
            $res->throw();
            echo $res;
            echo 'That response is when the request was sent';
            return json(['checkout_url' => $res['checkout_url']]);
        }
        $isSuccessful = Vote::bulkVote($votes);
        if (!$isSuccessful) return Response('sucessful. Thankyou for letting your vote count');
        return Response('Sorry, Voting was not successful, an error occurred', 500);
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
        try {
        $client = Client::getClientWithId((int) $id);
        echo $client;
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
        } catch (Exception $e) {
            echo $e;
            return Response('Sorry, an error occurred', 500);
        }
    }

    public function sendVotingLink(Request $request) {
        $usr = Authenticate::user();
        $billing = $request->post('billing');
        $amount = $request->post('amount');
        if ($billing == null || ($billing != 'yes' && $billing != 'no')) return Response('billing parameter must be yes or no', 400);
        if ($billing == 'yes' && ($amount == null || gettype($amount) != 'integer')) return Response('Billing must be a number greater than zero', 400);
        
        /*
        if ($billing == 'yes') {
            //billing functionality
            return Response('Billing has not been implemented yet', 400);
        }
        //elseif ($billing != 'no') return Response('billing param')
        */

        $client = $usr->client;
        if ($billing == 'no') Mail::sendVotingLink($client->voters, ['billing' => $billing]);
        else Mail::sendVotingLink($client->voters, ['billing' => $billing, 'amount' => $amount ]);
        return Response('mail sent successfully');
    }

    public function voteInterface (Request $request) {
        $identity = $request->get('i');
        if ($identity == null) return Response('', 404);
        var_dump($identity);
        $jwt = new JwtClaims();
        try {
            $data = $jwt->getClaims($identity);
            return view('/index/index');
        } catch (Exception $e) {
            echo $e;
            return Response('We cannot identify you', 404);
        }
        
        //var_dump($data);
        
    }
}
