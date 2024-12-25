<?php

namespace App\Models\Transaction;

use App\Models\Master\Category;
use App\Models\Master\User;
use App\Models\Scopes\UserScope;
use App\Observers\AuthorObserver;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Budget extends Model
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
        'amount',
        'category_id',
        'user_id',
        'start_periode',
        'end_periode',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function expense()
    {
        return $this->belongsTo(IncomeExpense::class, 'id', 'budget_id')->where('type', 'expense');
    }
}
