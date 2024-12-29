<?php

namespace App\Models\Master;

use App\Models\Scopes\UserScope;
use App\Observers\AuthorObserver;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    const TEMPLATE_COLORS = [
        ['bg' => '#f87171', 'text' => '#1c1917'],
        ['bg' => '#fb923c', 'text' => '#fff7ed'],
        ['bg' => '#fbbf24', 'text' => '#d97706'],
        ['bg' => '#4ade80', 'text' => '#f0fdf4'],
        ['bg' => '#22d3ee', 'text' => '#ecfeff'],
        ['bg' => '#164e63', 'text' => '#ecfeff'],
        ['bg' => '#1d4ed8', 'text' => '#eff6ff'],
        ['bg' => '#60a5fa', 'text' => '#eff6ff'],
        ['bg' => '#4f46e5', 'text' => '#eef2ff'],
        ['bg' => '#c026d3', 'text' => '#ecfeff'],
        ['bg' => '#e11d48', 'text' => '#ecfeff'],
        ['bg' => '#f472b6', 'text' => '#ecfeff'],
    ];

    public static function getRandomColor()
    {
        $colors = self::TEMPLATE_COLORS;
        $random = rand(0, count($colors) - 1);
        return $colors[$random]['bg'];
    }


    public static function booted()
    {
        static::observe(AuthorObserver::class);
        static::saving(function ($model) {
            $model->user_id = auth()->id();
            $model->color = self::getRandomColor();
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
