<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Master\RoleController;

Route::group(['middleware' => ['auth']], function() {
  Route::get('/', [RoleController::class, 'index'])->name('index');
  Route::post('/', [RoleController::class, 'store'])->name('store');
  // with export
  Route::get('/{id}', [RoleController::class, 'show'])->name('show');
  Route::put('/{id}', [RoleController::class, 'update'])->name('update');
  Route::delete('/{id}', [RoleController::class, 'destroy'])->name('destroy');
  Route::delete('/', [RoleController::class, 'bulkDestroy'])->name('bulkDestroy');
});