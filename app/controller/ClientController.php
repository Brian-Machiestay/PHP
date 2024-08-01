<?php

namespace app\controller;

use support\Request;
use app\model\Client;
use app\model\Preferences;
use app\model\User;
use Exception;
use Shopwwi\WebmanAuth\Facade\Auth;
use support\Db;
/**
 * Client controller
 */
class ClientController
{
    /**
     * @function - creates a new Client
     * @param - request object
     */
    public function client(Request $request)
    {
        $data = [
            'name' => $request->post('name'),
            'email' => $request->post('email'),
            'password' => $request->post('password'),
        ];
        echo json($data);
        foreach($data as $key => $val) {
            if ($val == null) return Response('some fields are missing', 400);
        }

        $usr = User::getUserWithEmail($data['email']);
        if ($usr != null) return Response('email already exists', 400);

        $usersWithName = User::getUsersWithName($data['name']);
        foreach($usersWithName as $thisUser) {
            if ($thisUser->client() != null) return Response('Name already exists', 400); 
        }
       
        try {
            $client = new Client(['approved' => false]);
            $client->save();
            $usr = new User(['client_id' => $client->id, 'email' => $data['email'], 'password' => password_hash($data['password'], PASSWORD_DEFAULT), 'name' => $data['name']]);
            $usr->save();
            $preference = new Preferences(['allowcandidates' => false, 'allowadmins' => false, 'client_id' => $client->id]);
            $preference->save();
            return json(['id'=> $client->id]);
        } catch (Exception $e) {
            echo $e;
            DB::rollBack();
            return Response('Could not create user, an error occurred', 500);
        }
        
    }

    public function login(Request $request) {
        $credentials = ['email' => $request->post('email'), 'password' => $request->post('password')];
        $user = User::getUserWithCredentials($credentials['email'], $credentials['password']);
        //var_dump($request->cookie());
        //echo password_hash($request->post('password'), PASSWORD_DEFAULT);
        if ($user == null) return Response('Invalid credentials', 400);
        $token = Auth::guard('client')->login($user);
        if ($token != false) {
            var_dump($token);
            return json($token)->cookie('access_token', $token->access_token,null, '/*')->cookie('refresh_token', $token->refresh_token,null, '/*');
        }
        return Response('Invalid credentials', 400);
    
    }

    public function logout (Request $request) {
        Auth::logout();
        return Response('logged out successfully');
    }

    public function clients(Request $resquest) {
        $allClients = Client::getAllClients();
        return json($allClients);
    }

    public function oneClient(Request $request) {
        $id = $request->get('id');
        $client = Client::getClientWithId($id);
        if ($client == null) return Response('Client does not exist', 400);
        return json($client);
    }

    public static function publish(Request $request) {
        $id = $request->get('id');
        $client = Client::getClientWithId($id);
        if ($client == null) return Response('Client does not exist', 400);
        $publish = $request->post('publish');
        if ($publish == null) return Response('publish field is missing', 400);
        $client->publish = $publish;
        $client->save();
        return Response('poll is live now');
    }

}
