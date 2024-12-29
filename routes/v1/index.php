<?php

use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'auth', 'as' => 'auth.'], function ($routes) {
  require 'auth.php';
});

Route::group(['prefix' => 'master', 'as' => 'master.'], function ($routes) {
  require 'master/index.php';
});

Route::group(['prefix' => 'transaction', 'as' => 'transaction.'], function ($routes) {
  require 'transaction/index.php';
});

Route::group(['prefix' => 'dashboard', 'as' => 'dashboard.'], function ($routes) {
  require 'dashboard.php';
});
