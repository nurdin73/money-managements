<?php

namespace App\Models\Master;

use App\Observers\AuthorObserver;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModulePrevilege extends Model
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
        'name',
        'description'
    ];
}
