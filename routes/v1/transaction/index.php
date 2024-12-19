<?php

use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'incomes', 'as' => 'incomes.'], function () {
  require 'incomes.php';
});

//:end-bindings: