<?php

namespace app\model;

use support\Model;
use app\model\Mail;
use Exception;

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

    /**
     * check if this voter has already voted
     */
    public static function voted(Voter $voter, Portfolio $portfolio) : bool {
        $vote = self::where('voter_id', $voter->id)->where('portfolio_id', $portfolio->id)->first();
        if ($vote == null) return false;
        return true;
    }

    public static function voteCount(Candidate $candidate, Portfolio $portfolio) {
        return self::where('candidate_id', $candidate->id)->where('portfolio_id', $portfolio->id)->count();
    }

    public static function bulkVote (Array $votes) {
        try {
            foreach ($votes as $vt) {
                $vt->save();
                return true;
            }
        } catch (Exception $e) {
            echo $e;
            return false;
        }
    }
    
}
