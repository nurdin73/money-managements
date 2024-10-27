<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response(['message' => 'Welcome to ' . config('app.name') . ' API'], 201);
});
Route::group(['as' => 'v1.', 'middleware' => 'api'], function () {
    Route::get('/', function () {
        return response([
            'message' => 'Welcome to ' . config('app.name') . ' API version ' . config('app.api_version'),
            'api_docs_url' => config('app.api_docs_url'),
        ], 201);
    });
    require 'v1/index.php';
});
