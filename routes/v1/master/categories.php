<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Master\CategoryController;

Route::group(['middleware' => ['auth']], function() {
  Route::get('/', [CategoryController::class, 'index'])->name('index');
  Route::post('/', [CategoryController::class, 'store'])->name('store');
  // with export
  Route::get('/{id}', [CategoryController::class, 'show'])->name('show');
  Route::put('/{id}', [CategoryController::class, 'update'])->name('update');
  Route::delete('/{id}', [CategoryController::class, 'destroy'])->name('destroy');
  Route::delete('/', [CategoryController::class, 'bulkDestroy'])->name('bulkDestroy');
});