<?php

namespace App\Repositories\Transaction;

use App\Repositories\BaseRepositoryInterface;

/**
 * Interface BudgetRepository.
 *
 * @package namespace App\Repositories\Transaction;
 */
interface BudgetRepository extends BaseRepositoryInterface
{
    public function getBudgetByCategory($category_id);
}
