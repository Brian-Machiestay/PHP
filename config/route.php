<?php
/**
 * This file is part of webman.
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the MIT-LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @author    walkor<walkor@workerman.net>
 * @copyright walkor<walkor@workerman.net>
 * @link      http://www.workerman.net/
 * @license   http://www.opensource.org/licenses/mit-license.php MIT License
 */

use Webman\Route;

Route::group('/api/v1', function() {
      Route::group('/auth', function() {
            Route::post('/client', [app\controller\ClientController::class, 'client']);
      });

      Route::group('', function() {
            Route::get('/client', [app\controller\ClientController::class, 'oneClient']);
            Route::put('/preferences', [app\controller\PreferencesController::class, 'updatePreferences']);
            Route::get('/preferences', [app\controller\PreferencesController::class, 'retrieveClientPreferences']);
            Route::post('/admin', [app\controller\AdminController::class, 'addAdmin']);
            Route::get('/admins', [app\controller\AdminController::class, 'getAdmins']);
            Route::post('/candidate', [app\controller\CandidateController::class, 'addCandidate']);
            Route::get('/candidates', [app\controller\CandidateController::class, 'retrieveCandidates']);
            Route::post('/portfolio', [app\controller\PortfolioController::class, 'addPortfolio']);
            Route::get('/portfolios', [app\controller\PortfolioController::class, 'retrievePortfolio']);
            Route::post('/voter', [app\controller\VoterController::class, 'addVoter']);
            Route::any('/voters', [app\controller\VoterController::class, 'retrieveVoters']);
            Route::put('/publish', [app\controller\ClientController::class, 'publish']);
            Route::any('/results', [app\controller\VoteController::class, 'results']);
      });

      Route::any('/{id}/vote', [app\controller\VoteController::class, 'vote']);
      Route::any('/{id}/vote/data', [app\controller\VoteController::class, 'data']);

      Route::group('/admin', function() {
            Route::get('/clients', [app\controller\ClientController::class, 'clients']);
      });
});

Route::group('/{client_id}', function () {
      Route::put('/preferences', [app\controller\PreferencesController::class, 'updatePreferences']);
});



Route::disableDefaultRoute();






