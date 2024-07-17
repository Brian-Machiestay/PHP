<?php

namespace app\model;

use support\Model;
use support\Db;

/**
 *
 */
class Preferences extends Model
{
    
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'preferences';

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
    protected $fillable = ['allowcandidates', 'allowadmins', 'client_id'];

    public function client() {
        return $this->belongsTo('app\model\Client', 'client_id');
    }
    
    static function getClientPreferences($client_id) {
        $preference = Preferences::where('client_id', $client_id)->firstOrFail();
        return $preference;
    }

    static function updateClientPreferences($allowcandidates, $allowadmins, $client_id) {
        $pref = Preferences::getClientPreferences($client_id);
        $pref->allowadmins = $allowadmins;
        $pref->allowcandidates = $allowcandidates;
        $pref->save();
        return $pref;
    }
    
}
