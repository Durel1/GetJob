<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\CandidatAuthController;
use App\Http\Controllers\Api\Auth\RecruteurAuthController;
use App\Http\Controllers\JobOfferController;
use App\Http\Controllers\ApplicationController;

Route::prefix('candidat')->group(function () {
    Route::post('/register', [CandidatAuthController::class, 'register']);
    Route::post('/login', [CandidatAuthController::class, 'login']);
    Route::middleware('auth:sanctum')->post('/logout', [CandidatAuthController::class, 'logout']);
});

Route::prefix('recruteur')->group(function () {
    Route::post('/register', [RecruteurAuthController::class, 'register']);
    Route::post('/login', [RecruteurAuthController::class, 'login']);
    Route::middleware('auth:sanctum')->post('/logout', [RecruteurAuthController::class, 'logout']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/offers', [JobOfferController::class, 'store']);
});

Route::get('/offers', function () {
    return \App\Models\JobOffer::with('recruiter')->get();
});

Route::post('/candidatures', [ApplicationController::class, 'store']);
Route::get('/mes-candidatures/{candidat_id}', [ApplicationController::class, 'mesCandidatures']);

