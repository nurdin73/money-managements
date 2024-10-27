<?php

use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'users', 'as' => 'users.'], function () {
  require 'users.php';
});

Route::group(['prefix' => 'modules', 'as' => 'modules.'], function () {
  require 'modules.php';
});

Route::group(['prefix' => 'roles', 'as' => 'roles.'], function () {
  require 'roles.php';
});

Route::group(['prefix' => 'module-previleges', 'as' => 'module-previleges.'], function () {
  require 'module-previleges.php';
});

//:end-bindings: