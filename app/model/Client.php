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

    protected $fillable = ['name', 'approved'];

    public function user() {
        return $this->belongsTo(User::class, 'id', 'client_id');
    }

    public function preferences() {
        return $this->hasOne('app\model\Preferences');
    }

    public function portfolios() {
        return $this->hasMany('app\model\Portfolio');
    }

    public function candidates() {
        return $this->hasMany('app\model\Candidate', 'candidate_id', 'id');
    }

    public function administrators(){
        return $this->hasMany('app\model\Administrator');
    }

    public function voters() {
        return $this->hasMany('app\model\Voter');
    }

    static function getClientWithName($name) {
        return Db::table('client')->where('name', $name)->first();
    }

    static function getClientWithId($id) {
        return Db::table('client')->where('id', $id)->first();
    }

    static function getAllClients() {
        return Db::table('client')->get();
    }
}