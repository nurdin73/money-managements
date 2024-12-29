<?php

namespace App\Repositories\Transaction;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\Transaction\IncomeExpenseRepository;
use App\Models\Transaction\IncomeExpense;
use App\Criteria\DefaultRequestCriteriaCriteria;
use Carbon\Carbon;

/**
 * Class IncomeExpenseRepositoryEloquent.
 *
 * @package namespace App\Repositories\Transaction;
 */
class IncomeExpenseRepositoryEloquent extends BaseRepository implements IncomeExpenseRepository
{
    protected $fieldSearchable = [
        'name' => 'like',
        'amount' => 'like',
        'category.name' => 'like',
        'created_at' => 'like'
    ];
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

    public function reportByYears(int $totalYear)
    {
        $incomes = $this->model->selectRaw('YEAR(created_at) as year, SUM(amount) as total')
            ->where('type', 'income')
            ->groupBy('year')
            ->orderBy('year', 'desc')
            ->limit($totalYear)
            ->get();
        $expenses = $this->model->selectRaw('YEAR(created_at) as year, SUM(amount) as total')
            ->where('type', 'expense')
            ->groupBy('year')
            ->orderBy('year', 'desc')
            ->limit($totalYear)
            ->get();
        $years = [];
        for ($i = 0; $i < $totalYear; $i++) {
            $years[] = date('Y') - $i;
        }
        $results = [];
        foreach ($years as $year) {
            $income = $incomes->where('year', $year)->first();
            $expense = $expenses->where('year', $year)->first();
            $results[$year] = [
                'income' => $income ? $income->total : 0,
                'expense' => $expense ? $expense->total : 0,
                'profit' => ($income ? $income->total : 0) - ($expense ? $expense->total : 0),
            ];
        }

        return $results;
    }

    public function reportByMonths(int $currentYear)
    {
        $incomes = $this->model->selectRaw('MONTH(created_at) as month, SUM(amount) as total')
            ->where('type', 'income')
            ->whereRaw('YEAR(created_at) = ?', [$currentYear])
            ->groupBy('month')
            ->orderBy('month', 'asc')
            ->get();
        $expenses = $this->model->selectRaw('MONTH(created_at) as month, SUM(amount) as total')
            ->where('type', 'expense')
            ->whereRaw('YEAR(created_at) = ?', [$currentYear])
            ->groupBy('month')
            ->orderBy('month', 'asc')
            ->get();
        $results = [];
        for ($i = 1; $i <= 12; $i++) {
            // ubah menjadi month string
            $month = now()->month($i)->translatedFormat('F');
            $results[$month] = [
                'income' => $incomes->where('month', $i)->first() ? $incomes->where('month', $i)->first()->total : 0,
                'expense' => $expenses->where('month', $i)->first() ? $expenses->where('month', $i)->first()->total : 0,
                'profit' => ($incomes->where('month', $i)->first() ? $incomes->where('month', $i)->first()->total : 0) - ($expenses->where('month', $i)->first() ? $expenses->where('month', $i)->first()->total : 0),
            ];
        }
        return $results;
    }

    public function reportByDays(string $currentMonth)
    {
        $incomes = $this->model->selectRaw('DATE(created_at) as date, SUM(amount) as total')
            ->where('type', 'income')
            ->whereRaw('DATE_FORMAT(created_at, "%Y-%m") = ?', [$currentMonth])
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get();
        $expenses = $this->model->selectRaw('DATE(created_at) as date, SUM(amount) as total')
            ->where('type', 'expense')
            ->whereRaw('DATE_FORMAT(created_at, "%Y-%m") = ?', [$currentMonth])
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get();
        $results = [];
        for ($i = 1; $i <= now()->daysInMonth; $i++) {
            $results[$i] = [
                'income' => $incomes->where('date', $currentMonth . '-' . str_pad($i, 2, '0', STR_PAD_LEFT))->first() ? $incomes->where('date', $currentMonth . '-' . str_pad($i, 2, '0', STR_PAD_LEFT))->first()->total : 0,
                'expense' => $expenses->where('date', $currentMonth . '-' . str_pad($i, 2, '0', STR_PAD_LEFT))->first() ? $expenses->where('date', $currentMonth . '-' . str_pad($i, 2, '0', STR_PAD_LEFT))->first()->total : 0,
                'profit' => ($incomes->where('date', $currentMonth . '-' . str_pad($i, 2, '0', STR_PAD_LEFT))->first() ? $incomes->where('date', $currentMonth . '-' . str_pad($i, 2, '0', STR_PAD_LEFT))->first()->total : 0) - ($expenses->where('date', $currentMonth . '-' . str_pad($i, 2, '0', STR_PAD_LEFT))->first() ? $expenses->where('date', $currentMonth . '-' . str_pad($i, 2, '0', STR_PAD_LEFT))->first()->total : 0),
            ];
        }
        return $results;
    }

    public function reportByDay(string $currentDay)
    {
        // grouping berdasarkan jam nya
        $incomes = $this->model->selectRaw('HOUR(created_at) as hour, SUM(amount) as total')
            ->where('type', 'income')
            ->whereRaw('DATE(created_at) = ?', [$currentDay])
            ->groupBy('hour')
            ->orderBy('hour', 'asc')
            ->get();
        $expenses = $this->model->selectRaw('HOUR(created_at) as hour, SUM(amount) as total')
            ->where('type', 'expense')
            ->whereRaw('DATE(created_at) = ?', [$currentDay])
            ->groupBy('hour')
            ->orderBy('hour', 'asc')
            ->get();
        $results = [];
        for ($i = 0; $i < 24; $i++) {
            $hour = date('H:i', mktime($i, 0, 0, 0, 10));
            $results[$hour] = [
                'income' => $incomes->where('hour', $i)->first() ? $incomes->where('hour', $i)->first()->total : 0,
                'expense' => $expenses->where('hour', $i)->first() ? $expenses->where('hour', $i)->first()->total : 0,
                'profit' => ($incomes->where('hour', $i)->first() ? $incomes->where('hour', $i)->first()->total : 0) - ($expenses->where('hour', $i)->first() ? $expenses->where('hour', $i)->first()->total : 0),
            ];
        }
        return $results;
    }
}
