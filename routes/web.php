<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\TeacherController;
use App\Models\Student;
use App\Models\Teacher;
use App\Http\Controllers\StudentController;


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


    Route::get('/students', [StudentController::class, 'index'])->name('student.index');
    Route::post('/students', [StudentController::class, 'store'])->name('student.store');
    Route::put('/students/{student}', [StudentController::class, 'update'])->name('student.update');
    Route::delete('/students/{student}', [StudentController::class, 'destroy'])->name('student.destroy');
});

require __DIR__.'/settings.php';
