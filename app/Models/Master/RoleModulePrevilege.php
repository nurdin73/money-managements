<?php

namespace App\Models\Master;

use App\Observers\AuthorObserver;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoleModulePrevilege extends Model
{
    use HasFactory;

    public static function booted()
    {
        static::observe(AuthorObserver::class);
    }

    protected $fillable = [
        'created_by',
        'updated_by',
        'm_role_module_id',
        'm_module_previlege_id',
    ];

    public function modulePrevilege()
    {
        return $this->belongsTo(ModulePrevilege::class, 'm_module_previlege_id', 'id');
    }
}
