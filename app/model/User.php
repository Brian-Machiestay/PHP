<?php

namespace app\model;

use support\Model;

/**
 *
 */
class User extends Model
{   
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    protected $fillable = ['email', 'password', 'name', 'client_id', 'candidate_id', 'administrator_id', 'voter_id'];
    
    public function client() {
        return $this->belongsTo(Client::class, 'client_id', 'id');
    }

    public function admin() {
        return $this->belongsTo(Administrator::class, 'client_id', 'id');
    }

    public function candidate() {
        return $this->belongsTo(Candidate::class, 'client_id', 'id');
    }

    public function voter() {
        return $this->belongsTo(Voter::class, 'voter_id', 'id');
    }

    public static function getUserWithEmail($email) {
        return self::where('email', $email)->first();
    }
    
    public static function getUsersWithName($name) {
        return self::where('name', $name)->get();
    }

    public static function getUserWithCredentials(String $email, String $pwd) : User | null {
        $user = self::where('email', $email)->first();
        if ($user == null) return $user;
        //echo var_dump(password_verify($pwd, $user->password));
        if (password_verify($pwd, $user->password)) return $user;
        echo 'we were here';
        return null;
    }

}
