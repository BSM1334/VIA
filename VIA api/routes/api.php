<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AccountsController;
use App\Http\Controllers\AccidentController;

Route::post('/signup', [AccountsController::class, 'signup']);
Route::post('/login', [AccountsController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [AccountsController::class, 'profile']);
    Route::put('/profile', [AccountsController::class, 'updateProfile']);
    Route::post('/accidents', [AccidentController::class, 'store']);
    Route::post('/logout', [AccountsController::class, 'logout']);
});

Route::get('/accidents', [AccidentController::class, 'index']);
Route::put('/accidents/{id}', [AccidentController::class, 'update']);
Route::delete('/accidents/{id}', [AccidentController::class, 'destroy']);