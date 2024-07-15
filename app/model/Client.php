<?php

namespace app\model;

use support\Model;

class Client extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'client';

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

    protected $fillable = ['name', 'created_at', 'updated_at'];

    function getUserWithId() {
        return DB::class
    }
}