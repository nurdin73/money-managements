<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth:api'], function () {
  Route::get('/basic-statistic', [DashboardController::class, 'basicStatistic']);
  Route::get('/expense-detail', [DashboardController::class, 'expenseDetail']);
  Route::get('/financial-indicator', [DashboardController::class, 'financialIndicator']);
  Route::get('/budget-summary', [DashboardController::class, 'budgetSummary']);
  Route::get('/last-transaction', [DashboardController::class, 'lastTransaction']);
  Route::get('/budget-effeciency', [DashboardController::class, 'budgetEffeciency'])->name('budget-effeciency');
});
