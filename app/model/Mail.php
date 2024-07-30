<?php

namespace app\model;

use Exception;
use PHPMailer\PHPMailer\PHPMailer;
//use PHPMailer\PHPMailer\Exception;

/**
 * 
 */
class Mail
{
    private $mail;

    public function __construct()
    {
        $this->mail = new PHPMailer();
        $this->mail->Host = getenv('MAIL_HOST');
        $this->mail->Password = getenv('MAIL_PASSWORD');
        $this->mail->Port = getenv('MAIL_PORT');
        $this->mail->SMTPAuth = true;
        $this->mail->setFrom('brianmachiestay@gmail.com', 'Mailer');
    }
   
    public function sendVotingLink(Array $voters, string $link) {
        //$data = array('name' => "brian machiestay");
        try {
            $this->mail->addAddress('briamachiestay@gmail.com');
            $this->mail->Subject = 'This is a Test email';
            $this->mail->Body = 'This is a test email message';
            $this->mail->send();
        } catch (Exception $e) {
            echo $e;
        }
    }
}



