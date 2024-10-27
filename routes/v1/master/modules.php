<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Master\ModuleController;

Route::group(['middleware' => ['auth']], function() {
  Route::get('/', [ModuleController::class, 'index'])->name('index');
  Route::post('/', [ModuleController::class, 'store'])->name('store');
  // with export
  Route::get('/{id}', [ModuleController::class, 'show'])->name('show');
  Route::put('/{id}', [ModuleController::class, 'update'])->name('update');
  Route::delete('/{id}', [ModuleController::class, 'destroy'])->name('destroy');
  Route::delete('/', [ModuleController::class, 'bulkDestroy'])->name('bulkDestroy');
});