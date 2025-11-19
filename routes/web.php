<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\TeacherController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/teachers', [TeacherController::class, 'index'])->name('teacher.index');
    Route::post('/teachers', [TeacherController::class, 'store'])->name('teacher.store');
    Route::put('/teachers/{teacher}', [TeacherController::class, 'update'])->name('teacher.update');
    Route::delete('/teachers/{teacher}', [TeacherController::class, 'destroy'])->name('teacher.destroy');
});

require __DIR__.'/settings.php';
