<?php

namespace App\Models\Master;

use App\Observers\AuthorObserver;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    public static function booted()
    {
        static::observe(AuthorObserver::class);
    }

    protected $fillable = [
        'created_by',
        'updated_by',
        'name'
    ];

    public function roleModules()
    {
        return $this->hasMany(RoleModule::class, 'role_id', 'id');
    }
}
