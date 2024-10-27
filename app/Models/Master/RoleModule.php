<?php

namespace App\Models\Master;

use App\Observers\AuthorObserver;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RoleModule extends Model
{
    use HasFactory;

    public static function booted()
    {
        static::observe(AuthorObserver::class);
    }

    protected $fillable = [
        'created_by',
        'updated_by',
        'module_id',
        'role_id',
    ];

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class, 'role_id', 'id');
    }

    public function module(): BelongsTo
    {
        return $this->belongsTo(Module::class, 'module_id', 'id');
    }

    public function previleges()
    {
        return $this->hasMany(RoleModulePrevilege::class, 'm_role_module_id', 'id');
    }
}
