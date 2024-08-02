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