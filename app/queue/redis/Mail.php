<?php

namespace app\queue\redis;
use Exception;
use PHPMailer\PHPMailer\PHPMailer;

use Webman\RedisQueue\Consumer;
use Webman\RedisQueue\Client;
use app\model\JwtClaims;

class Mail implements Consumer
{
    // 要消费的队列名
    public $queue = 'send_mail';

    // 连接名，对应 plugin/webman/redis-queue/redis.php 里的连接`
    public $connection = 'default';

    // 消费
    public function consume($data)
    {
        $mail = new PHPMailer(true);
        $mail->SMTPDebug = 1;
        $mail->isSMTP();
        $mail->Host = getenv('MAIL_HOST');
        $mail->Password = getenv('MAIL_PASSWORD');
        $mail->Username = getenv('MAIL_USERNAME');
        $mail->Port = (int) getenv('MAIL_PORT');
        $mail->SMTPAuth = true;
        $mail->SMTPSecure = 'tls';
        $mail->setFrom('brianmachiestay@gmail.com', 'Brian Machiestay');
        $mail->addAddress($data['email']);
        $mail->Subject = $data['subject'];
        $mail->isHTML(true);
        $mail->Body = $data['msg'];
        try {
            $mail->send();
        } catch (Exception $e) {
            echo $e;
        }
        //var_dump($data);
    }
   
    public static function sendVotingLink($voters) {
        foreach ($voters as $vt) {
            $subject = 'Voting link from ' . $vt->client->user->name;
            $data = ['email' => $vt->user->email, 'id' => $vt->id, 'client_id' => $vt->client->id, 'subject' => $subject];
            $msg = '<p>Hi ' . $vt->user->name . '</p> <p>A poll has been opened by ' . $vt->client->user->name . ' and you are a voter in that poll.</p> <p>Click on the button below to cast your vote</p>';
            $jwt = new JwtClaims();
            $jwt = $jwt->getJwt($data, 300);
            $link = getenv('THUMBS_VOTING_DOMAIN') . '/vote?i=' . $jwt . '&client_id=' . $vt->client->id;
            $msg .= '<button style="background-color: green; outline: none; border: none; border-radius: 5px; margin-left: 40%; padding: 10px"><a style="color: white; text-decoration: none; font-weight: bold" href="' . $link . '">Vote Here</button>';
            $msg .= '<p>NOTE: <span style="color: violet">the link is personalized and so sharing it would impact your chance</span></p>';
            $msg .= 'THUMBS 🗳️';
            $data['msg'] = $msg;
            Client::connection('default')->send('send_mail', $data);
        }
    }
}
