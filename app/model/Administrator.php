<?php

namespace app\model;

use support\Model;

/**
 *
 */
class Administrator extends Model
{   
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'administrators';

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
    
    protected $fillable = ['client_id', 'level', 'active'];

    public function user() {
        return $this->belongsTo('app\model\User', 'client_id', 'id');
    }

    static function getAdmin($admin_id) {
        return self::where('id', $admin_id)->first();
    }

    static function getAdmins($client_id) {
        return Administrator::where('client_id', $client_id);
    }

    static function updateAdministrator($admin_id, $level, $active) {
        $admin = Administrator::find($admin_id);
        $admin->level = $level;
        $admin->active = $active;
        $admin->save();
        return $admin;
    }

    static function inactivateAdmin($admin_id) {
        $admin = Administrator::find($admin_id);
        $admin->active = false;
        $admin->save();
    }
    
    
}
