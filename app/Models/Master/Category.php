<?php

namespace App\Models\Master;

use App\Models\Scopes\UserScope;
use App\Observers\AuthorObserver;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    public static function booted()
    {
        static::observe(AuthorObserver::class);
        static::creating(function ($model) {
            $model->user_id = auth()->id();
        });

        static::addGlobalScope(new UserScope);
    }

    protected $fillable = [
        'created_by',
        'updated_by',
        'name',
        'is_active',
        'user_id',
        'color'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
