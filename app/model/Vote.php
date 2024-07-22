<?php

namespace app\model;

use support\Model;

/**
 *
 */
class Vote extends Model
{   
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'votes';

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

    protected $fillable = ['candidate_id', 'voter_id', 'portfolio_id'];
    
    public function candidate() {
        return $this->belongsTo('app\model\Candidate', 'candidate_id');
    }
    
}
