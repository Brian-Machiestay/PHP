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

    protected $fillable = ['client_id', 'name', 'portoflio_id', 'client_id'];
    
    public function portfolio() {
        return $this->hasOne('app\model\Portfolio', 'id');
    }

    public function user() {
        return $this->belongsTo(User::class, 'candidate_id', 'id');
    }

    public function votes() {
        return $this->hasMany(Vote::class, 'candidate_id', 'id');
    }
}
