<?php

namespace app\model;

use support\Model;
use support\Db;

class Client extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'clients';

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

    /**
     * The name of the client
     */
    public $name;

    protected $fillable = ['approved'];

    public function preferences() {
        return $this->hasOne('app\model\Preferences');
    }

    public function portfolios() {
        return $this->hasMany('app\model\Portfolio', 'client_id', 'id');
    }

    public function candidates() {
        return $this->hasMany('app\model\Candidate', 'client_id', 'id');
    }

    public function user() {
        return $this->hasOne('app\model\User', 'client_id', 'id');
    }

    public function administrators(){
        return $this->hasMany('app\model\Administrator', 'client_id', 'id');
    }

    public function voters() {
        return $this->hasMany('app\model\Voter', 'client_id', 'id');
    }

    static function getClientWithId($id) {
        return Client::where('id', $id)->first();
    }

    static function getAllClients() {
        return Client::all()->toArray();
    }
}