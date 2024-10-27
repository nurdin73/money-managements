<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Master\ModulePrevilegeController;

Route::group(['middleware' => ['auth']], function() {
  Route::get('/', [ModulePrevilegeController::class, 'index'])->name('index');
  Route::post('/', [ModulePrevilegeController::class, 'store'])->name('store');
  // with export
  Route::get('/{id}', [ModulePrevilegeController::class, 'show'])->name('show');
  Route::put('/{id}', [ModulePrevilegeController::class, 'update'])->name('update');
  Route::delete('/{id}', [ModulePrevilegeController::class, 'destroy'])->name('destroy');
  Route::delete('/', [ModulePrevilegeController::class, 'bulkDestroy'])->name('bulkDestroy');
});