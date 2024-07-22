<?php

namespace app\model;

use support\Model;

/**
 *
 */
class Voter extends Model
{
    
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'voters';

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
    
    protected $fillable = ['client_id', 'candidate_id'];
    
    public function client() {
        return $this->belongsTo(Client::class, 'client_id', 'id');
    }

    public function admin() {
        return $this->belongsTo(Administrator::class, 'admin_id');
    }

    public function candidate() {
        return $this->belongsTo(Candidate::class, 'candidate_id');
    }

    public static function getVoterWithId(string $id) : Voter {  
        return self::where('id', $id)->first();
    }
}
