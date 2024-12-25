<?php

namespace App\Repositories\Transaction;

use App\Repositories\BaseRepositoryInterface;

/**
 * Interface IncomeExpenseRepository.
 *
 * @package namespace App\Repositories\Transaction;
 */
interface IncomeExpenseRepository extends BaseRepositoryInterface
{
    public function reportByYears(int $totalYear);
    public function reportByMonths(int $currentYear);
    public function reportByDays(string $currentMonth);
    public function reportByDay(string $currentDay);
}
