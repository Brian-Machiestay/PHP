<?php

namespace app\model;

use support\Model;

/**
 *
 */
class Portfolio extends Model
{   
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'portfolios';

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
    protected $fillable = ['client_id', 'category'];

    public function client() {
        return $this->belongsTo('app\model\Client', 'client_id', 'id');
    }

    public function candidates() {
        return $this->hasMany('app\model\Candidate', 'portfolio_id', 'id');
    }

    public function votes() {
        return $this->hasMany(Vote::class, 'portfolio_id', 'id');
    }

    public static function getPortfolio(Client $client, string $id) {
        return $client->portfolios()->where('id', $id)->first();
    }
    
    
}
