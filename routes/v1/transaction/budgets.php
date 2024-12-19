<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Transaction\BudgetController;

Route::group(['middleware' => ['auth']], function() {
  Route::get('/', [BudgetController::class, 'index'])->name('index');
  Route::post('/', [BudgetController::class, 'store'])->name('store');
  // with export
  Route::get('/{id}', [BudgetController::class, 'show'])->name('show');
  Route::put('/{id}', [BudgetController::class, 'update'])->name('update');
  Route::delete('/{id}', [BudgetController::class, 'destroy'])->name('destroy');
  Route::delete('/', [BudgetController::class, 'bulkDestroy'])->name('bulkDestroy');
});