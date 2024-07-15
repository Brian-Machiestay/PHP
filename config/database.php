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

return [
      'connections' => [
            'pgsql' => [
                  'driver'   => 'pgsql',
                  'host'     => '127.0.0.1',
                  'port'     => 5432,
                  'database' => 'voting_system',
                  'username' => 'postgres',
                  'password' => 'kwakye',
                  'charset'  => 'utf8',
                  'prefix'   => '',
                  'schema'   => 'public',
                  'sslmode'  => 'prefer',
            ],
      ]
];
