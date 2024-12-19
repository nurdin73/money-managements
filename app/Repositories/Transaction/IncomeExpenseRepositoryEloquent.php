<?php

namespace App\Repositories\Transaction;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\Transaction\IncomeExpenseRepository;
use App\Models\Transaction\IncomeExpense;
use App\Criteria\DefaultRequestCriteriaCriteria;

/**
 * Class IncomeExpenseRepositoryEloquent.
 *
 * @package namespace App\Repositories\Transaction;
 */
class IncomeExpenseRepositoryEloquent extends BaseRepository implements IncomeExpenseRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return IncomeExpense::class;
    }



    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(DefaultRequestCriteriaCriteria::class));
    }
}
