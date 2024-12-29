<?php

namespace App\Http\Controllers;

use App\ActionBudgetHistory;
use App\Models\Transaction\BudgetHistory;
use App\Repositories\Master\CategoryRepository;
use App\Repositories\Transaction\BudgetRepository;
use App\Repositories\Transaction\IncomeExpenseRepository;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    protected IncomeExpenseRepository $incomeExpenseRepository;
    protected BudgetRepository $budgetRepository;

    protected CategoryRepository $categoryRepository;

    public function __construct(IncomeExpenseRepository $incomeExpenseRepository, BudgetRepository $budgetRepository, CategoryRepository $categoryRepository)
    {
        $this->incomeExpenseRepository = $incomeExpenseRepository;
        $this->budgetRepository = $budgetRepository;
        $this->categoryRepository = $categoryRepository;
    }

    public function basicStatistic(Request $request)
    {
        $params = $this->validate($request, [
            'start_periode' => 'required|date',
            'end_periode' => 'required|date',
        ]);
        $data['income'] = $this->incomeExpenseRepository->where('type', 'income')->whereBetween('created_at', [$params['start_periode'], $params['end_periode']])->sum('amount');
        $data['expense'] = $this->incomeExpenseRepository->where('type', 'expense')->whereBetween('created_at', [$params['start_periode'], $params['end_periode']])->sum('amount');
        $data['budget'] = BudgetHistory::where('action', ActionBudgetHistory::CREATE)->whereHas('budget', function (Builder $q) use ($params) {
            $q->whereBetween('start_periode', [$params['start_periode'], $params['end_periode']]);
            $q->whereBetween('end_periode', [$params['start_periode'], $params['end_periode']]);
        })->sum('new_value');


        // $data['budgetSpace'] = $data['budget'] - $data['expense'];
        $data['budgetSpace'] = $this->budgetRepository->whereBetween('start_periode', [$params['start_periode'], $params['end_periode']])->whereBetween('end_periode', [$params['start_periode'], $params['end_periode']])->sum('amount');

        return $this->sendResponse("Get basic statistic", $data);
    }

    public function expenseDetail(Request $request)
    {
        $params = $this->validate($request, [
            'start_periode' => 'required|date',
            'end_periode' => 'required|date',
        ]);

        $expenses = $this->incomeExpenseRepository->select([
            'categories.name',
            DB::raw("SUM(income_expenses.amount) as total")
        ])
            ->leftJoin('categories', 'categories.id', '=', 'income_expenses.category_id')
            ->where('type', 'expense')->whereBetween('income_expenses.created_at', [$params['start_periode'], $params['end_periode']])
            ->groupBy('categories.name')->orderBy('total', 'desc')->limit(5)->get();

        return $this->sendResponse("Expense detail", $expenses);
    }

    public function financialIndicator(Request $request)
    {
        $params = $this->validate($request, [
            'start_periode' => 'required|date',
            'end_periode' => 'required|date',
        ]);

        $income = $this->incomeExpenseRepository->where('type', 'income')->whereBetween('created_at', [$params['start_periode'], $params['end_periode']])->sum('amount');
        $expense = $this->incomeExpenseRepository->where('type', 'expense')->whereBetween('created_at', [$params['start_periode'], $params['end_periode']])->sum('amount');

        $total = $income + $expense;
        $incomePercentage = $total > 0 ? ($income / $total) * 100 : 0;
        $expensePercentage = $total > 0 ? ($expense / $total) * 100 : 0;

        $data = [
            'income_percentage' => round($incomePercentage),
            'expense_percentage' => round($expensePercentage),
        ];

        return $this->sendResponse("Financial indicator", $data);
    }

    public function budgetSummary(Request $request)
    {
        $params = $this->validate($request, [
            'start_periode' => 'required|date',
            'end_periode' => 'required|date',
        ]);

        $budgetSummary = $this->budgetRepository->select([
            'categories.name',
            DB::raw("SUM(budgets.amount) as total")
        ])
            ->leftJoin('categories', 'categories.id', '=', 'budgets.category_id')
            ->whereBetween('start_periode', [$params['start_periode'], $params['end_periode']])->whereBetween('end_periode', [$params['start_periode'], $params['end_periode']])
            ->groupBy('categories.name')->get();

        $categories = $this->categoryRepository->where('is_active', true)->get();
        $results = [];
        foreach ($categories as $category) {
            $results[$category->name] = [
                'total' => collect($budgetSummary)->filter(fn($item) => $item->name == $category->name)->first()?->total ?? 0,
                'color' => $category->color
            ];
        }

        return $this->sendResponse("Budget summary", $results);
    }

    public function lastTransaction(Request $request)
    {
        $params = $this->validate($request, [
            'start_periode' => 'required|date',
            'end_periode' => 'required|date',
        ]);

        $lastTransactions = $this->incomeExpenseRepository->select([
            DB::raw("DATE(income_expenses.created_at) as tanggal"),
            DB::raw("SUM(amount) as total"),
            'type'
        ])
            ->leftJoin('categories', 'categories.id', '=', 'income_expenses.category_id')
            ->whereBetween('income_expenses.created_at', [$params['start_periode'], $params['end_periode']])
            ->groupBy('tanggal', 'type')->get()->groupBy('tanggal');
        $results = [];
        foreach ($lastTransactions as $key => $value) {
            $results[$key] = [
                'income' => collect($value)->where('type', 'income')->first()?->total ?? 0,
                'expense' => collect($value)->where('type', 'expense')->first()?->total ?? 0,
            ];
        }
        return $this->sendResponse("Last transaction summary", $results);
    }

    public function budgetEffeciency(Request $request)
    {
        $params = $this->validate($request, [
            'start_periode' => 'required|date',
            'end_periode' => 'required|date',
        ]);

        $budgetEffeciency = $this->budgetRepository->select([
            'categories.name',
            DB::raw("((SUM(budgets.amount) - (SELECT SUM(income_expenses.amount) FROM income_expenses WHERE income_expenses.category_id = budgets.category_id AND income_expenses.type = 'expense' AND income_expenses.created_at BETWEEN '{$params['start_periode']}' AND '{$params['end_periode']}')) / SUM(budgets.amount)) * 100 as efficiency")
        ])
            ->leftJoin('categories', 'categories.id', '=', 'budgets.category_id')
            ->where('start_periode', '>=', $params['start_periode'])
            ->where('end_periode', '>=', $params['end_periode'])
            ->groupBy('categories.name', 'budgets.category_id')
            ->orderBy('efficiency', 'desc')
            ->get();
        $categories = $this->categoryRepository->where('is_active', true)->get();
        $results = [];
        foreach ($categories as $category) {
            $results[$category->name] = collect($budgetEffeciency)->filter(fn($item) => $item->name == $category->name)->first()?->efficiency ?? 0;
        }
        return $this->sendResponse("Budget efficiency", $results);
    }
}
