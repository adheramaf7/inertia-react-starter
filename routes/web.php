<?php

use App\Http\Controllers\AccessManagement\RoleController;
use App\Http\Controllers\AccessManagement\UserController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', 'dashboard')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::resource('users', UserController::class);
    Route::resource('roles', RoleController::class)->except('show');
});

require __DIR__.'/settings.php';
