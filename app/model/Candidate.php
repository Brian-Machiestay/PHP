<?php

namespace app\model;

use support\Model;

/**
 *
 */
class Candidate extends Model
{   
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'candidates';

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

    protected $fillable = ['client_id', 'portfolio_id'];
    
    public function client() {
        return $this->belongsTo(Client::class, 'client_id', 'id');
    }

    public function portfolio() {
        return $this->belongsTo('app\model\Portfolio', 'portfolio_id', 'id');
    }

    public function user() {
        return $this->hasOne(User::class, 'candidate_id', 'id');
    }

    public function votes() {
        return $this->hasMany(Vote::class, 'candidate_id', 'id');
    }

    public static function getCandidate(Client $client, String $id) {
        return $client->candidates->where('id', $id)->first();
    }
}
