<?php

use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'users', 'as' => 'users.'], function () {
  require 'users.php';
});

//:end-bindings: