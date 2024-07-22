<?php

namespace app\controller;
use support\Request;
use support\Db;
use app\model\Client;
use Exception;

class PortfolioController
{
    public function addPortfolio(Request $request)
    {
        $id = $request->get('id');
        $client = Client::getClientWithId($id);
        $category = $request->post('category');
        if ($category == null) return Response('category cannot be empty', 400);

        $pps = $client->portfolios;
        foreach ($pps as $pp) {
            if ($pp->category == $category) return Response('portfolio already exists', 400);
        }
        try {
            $portfolio = $client->portfolios()->create(['category' => $category]);
            return json(['portfolio_id' => $portfolio->id]);
        } catch (Exception $e) {
            return Response('could not add portfolio, an error occurred', 500);
        }
    }

    public function retrievePortfolio(Request $request) {
        $id = $request->get('id');
        $client = Client::getClientWithId($id);
        $portfolios = $client->portfolios()->get();
        return json($portfolios);
    }
}
