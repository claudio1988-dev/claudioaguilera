<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\ContactController;

Route::get('/', function () {
    return Inertia::render('HomePage');
})->name('home');

Route::post('/contact', [ContactController::class, 'send'])->name('contact.send');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
