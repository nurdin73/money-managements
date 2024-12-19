<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Transaction\IncomeController;

Route::group(['middleware' => ['auth']], function() {
  Route::get('/', [IncomeController::class, 'index'])->name('index');
  Route::post('/', [IncomeController::class, 'store'])->name('store');
  // with export
  Route::get('/{id}', [IncomeController::class, 'show'])->name('show');
  Route::put('/{id}', [IncomeController::class, 'update'])->name('update');
  Route::delete('/{id}', [IncomeController::class, 'destroy'])->name('destroy');
  Route::delete('/', [IncomeController::class, 'bulkDestroy'])->name('bulkDestroy');
});