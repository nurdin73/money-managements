<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Master\UserController;

Route::group(['middleware' => []], function() {
  Route::get('/', [UserController::class, 'index']);
  Route::post('/', [UserController::class, 'store']);
  Route::get('/{id}', [UserController::class, 'show']);
  Route::put('/{id}', [UserController::class, 'update']);
  Route::delete('/{id}', [UserController::class, 'destroy']);
});