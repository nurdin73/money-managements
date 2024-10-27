<?php

namespace App\Models\Master;

use App\Observers\AuthorObserver;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Module extends Model
{
    use HasFactory;

    public static function booted()
    {
        static::observe(AuthorObserver::class);
    }

    protected $fillable = [
        'created_by',
        'updated_by',
        'name',
        'url',
        'sort',
        'parent_id',
        'icon'
    ];

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Module::class, 'parent_id', 'id');
    }

    function subModules(): HasMany
    {
        return $this->hasMany(Module::class, 'parent_id', 'id')->with(['subModules', 'previleges'])->orderBy('sort', 'asc');
    }

    function roles(): HasManyThrough
    {
        return $this->hasManyThrough(Role::class, RoleModule::class, 'module_id', 'id', 'id', 'role_id');
    }

    public function previleges()
    {
        return $this->hasMany(ModulePrevilege::class, 'module_id', 'id');
    }
}
