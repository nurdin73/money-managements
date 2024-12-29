<?php

namespace App\Repositories\Transaction;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\Transaction\BudgetRepository;
use App\Models\Transaction\Budget;
use App\Criteria\DefaultRequestCriteriaCriteria;

/**
 * Class BudgetRepositoryEloquent.
 *
 * @package namespace App\Repositories\Transaction;
 */
class BudgetRepositoryEloquent extends BaseRepository implements BudgetRepository
{
    protected $fieldSearchable = [
        'name' => 'like',
        'category.name' => 'like',
        'amount' => 'like',
    ];
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Budget::class;
    }



    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(DefaultRequestCriteriaCriteria::class));
    }

    public function getBudgetByCategory($category_id)
    {
        $now = now()->format('Y-m-d');
        $this->where('start_date', '<=', $now)->where('end_date', '>=', $now);
        return $this->where('category_id', $category_id)->first();
    }
}
