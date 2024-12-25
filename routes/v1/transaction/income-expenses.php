<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Transaction\IncomeExpenseController;

Route::group(['middleware' => ['auth']], function () {
  Route::get('/', [IncomeExpenseController::class, 'index'])->name('index');
  Route::post('/', [IncomeExpenseController::class, 'store'])->name('store');
  // with export
  Route::get('/report', [IncomeExpenseController::class, 'report'])->name('report');
  Route::get('/{id}', [IncomeExpenseController::class, 'show'])->name('show');
  Route::put('/{id}', [IncomeExpenseController::class, 'update'])->name('update');
  Route::delete('/{id}', [IncomeExpenseController::class, 'destroy'])->name('destroy');
  Route::delete('/', [IncomeExpenseController::class, 'bulkDestroy'])->name('bulkDestroy');
});
