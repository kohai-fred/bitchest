<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CryptoCotationController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('login', [AuthController::class, 'authenticate'])->name('login');

Route::middleware('auth:sanctum')->get('/current-user', [UserController::class, 'getCurrentUser'])->name('current-user');
Route::middleware('auth:sanctum')->post('/check-email', [UserController::class, 'checkEmail'])->name('check-email');

Route::middleware('auth:sanctum')->get('/cotations', [CryptoCotationController::class, 'all'])->name('cotations');
Route::middleware('auth:sanctum')->get('/latest-cotations', [CryptoCotationController::class, 'latestCotation'])->name('latest-cotations');
Route::middleware('auth:sanctum')->get('/crypto/{id}', [CryptoCotationController::class, 'cryptoCotationDetails'])->name('crypto-cotation-details');

Route::prefix('admin')->middleware('auth:sanctum')->name('admin.')->group(function () {
    Route::resource('users', UserController::class)->except(['show', 'create', 'edit']);
});
