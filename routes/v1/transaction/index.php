<?php

use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'income-expenses', 'as' => 'income-expenses.'], function () {
  require 'income-expenses.php';
});

Route::group(['prefix' => 'budgets', 'as' => 'budgets.'], function () {
  require 'budgets.php';
});

//:end-bindings: