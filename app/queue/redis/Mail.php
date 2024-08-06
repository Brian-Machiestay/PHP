<?php

namespace app\queue\redis;
use Exception;
use PHPMailer\PHPMailer\PHPMailer;

use Webman\RedisQueue\Consumer;
use Webman\RedisQueue\Client;

class Mail implements Consumer
{
    // 要消费的队列名
    public $queue = 'send_mail';

    // 连接名，对应 plugin/webman/redis-queue/redis.php 里的连接`
    public $connection = 'default';

    private $mail;

    // 消费
    public function consume($data)
    {
        // 无需反序列化
        var_export($data);
        echo 'dflkas;jfkdfjslfk;jsfl;ksdjflksdjflksdfjdslf';
    }

    public function __construct()
    {
        $this->mail = new PHPMailer(true);
        //echo getenv('MAIL_HOST');
        $this->mail->isSMTP();
        $this->mail->Host = getenv('MAIL_HOST');
        $this->mail->Password = getenv('MAIL_PASSWORD');
        //echo var_dump(getenv('MAIL_USERNAME'));
        $this->mail->Username = getenv('MAIL_USERNAME');
        $this->mail->Port = (int) getenv('MAIL_PORT');
        $this->mail->SMTPAuth = true;
        $this->mail->SMTPSecure = 'tls';
        $this->mail->setFrom('brianmachiestay@gmail.com', 'Brian Machiestay');
    }
   
    public function sendVotingLink($voters, string $link) {
        //$data = array('name' => "brian machiestay");
        Client::connection('default')->send('send_mail', 'book and cook');
        $this->mail->addAddress('briamachiestay@gmail.com');
        $this->mail->Subject = 'This is a Test email';
        $this->mail->Body = 'This is a test email message';
        //$this->mail->send();
        try {
            $this->mail->send();
            return true;
        } catch (Exception $e) {
            echo $e;
            return false;
        }
    }           
}
