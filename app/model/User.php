<?php

namespace app\model;

use support\Model;
use Illuminate\Hashing\BcryptHasher;

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
        return $this->hasOne(Client::class, 'id', 'client_id');
    }

    public function admins() {
        return $this->hasOne(Administrator::class, 'id', 'administrator_id');
    }

    public function candidates() {
        return $this->hasOne(Candidate::class, 'id', 'candidate_id');
    }

    public function voters() {
        return $this->hasOne(Voter::class, 'id', 'voter_id');
    }

    public static function getUserWithEmail($email) {
        return self::where('email', $email)->first();
    }
    
    public static function getUsersWithName($name) {
        return self::where('name', $name)->get();
    }
}
