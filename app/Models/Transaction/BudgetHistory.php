<?php

namespace App\Models\Transaction;

use App\Observers\AuthorObserver;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BudgetHistory extends Model
{
    use HasFactory;

    public static function booted()
    {
        static::observe(AuthorObserver::class);
    }

    protected $fillable = [
        'created_by',
        'updated_by',
        'budget_id',
        'expense_id',
        'old_value',
        'new_value',
        'action',
    ];

    public function budget()
    {
        return $this->belongsTo(Budget::class, 'budget_id');
    }
}
