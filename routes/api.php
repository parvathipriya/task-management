<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TaskLoginController;
use App\Http\Controllers\UserController;


Route::post('/signup', [TaskLoginController::class, 'signup']);
Route::post('/login', [TaskLoginController::class, 'login']);

	Route::get('/tasks', [TaskController::class, 'index']);
	Route::post('/tasks', [TaskController::class, 'store']);
	Route::put('/tasks/{task}', [TaskController::class, 'update']);
	Route::delete('/tasks/{task}', [TaskController::class, 'destroy']);

	Route::get('/users', [UserController::class, 'index']);



