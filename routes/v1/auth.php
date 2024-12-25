<?php

use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\ProfileController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\ResentVerifyController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\VerifyController;
use Illuminate\Support\Facades\Route;

Route::post('/login', LoginController::class)->middleware(['captcha', 'guest'])->name('login');
Route::post('/forgot-password', ForgotPasswordController::class)->middleware(['guest', 'captcha'])->name('forgot-password');
Route::post('/reset-password', ResetPasswordController::class)->middleware('guest')->name('reset-password');
Route::post('/resent-verify', ResentVerifyController::class)->middleware('guest')->name('resent-verify');
Route::post('/verify', VerifyController::class)->middleware('guest')->name('verify');
Route::post('/logout', LogoutController::class)->middleware('auth')->name('logout');
Route::get('/profile', [ProfileController::class, 'index'])->middleware(['auth', 'verified'])->name('profile');
Route::put('/profile', [ProfileController::class, 'changeProfile'])->middleware(['auth', 'verified'])->name('change-profile');
Route::post('/change-avatar', [ProfileController::class, 'changeAvatar'])->middleware(['auth', 'verified'])->name('change-avatar');
Route::post('refresh', [LoginController::class, 'refreshToken'])->name('refresh-token');
Route::post('logout', [LoginController::class, 'logout'])->middleware('auth');
Route::post('/register', RegisterController::class)->name('register')->middleware('guest');
