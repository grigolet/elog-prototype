<?php

use App\Http\Controllers\EntryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LogbookController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/logbooks');
Route::get('/settings', [HomeController::class, 'settings']);

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

// });

/**
 * ENTRIES
 */
Route::middleware(['auth', 'can:create entries'])->group(function () {
    Route::get('/entries/create', [EntryController::class, 'create'])->name('entry.create');
    Route::post('/entries', [EntryController::class, 'store'])->name('entry.store');
});

Route::middleware(['auth', 'can:view entries'])->group(function () {
    Route::get('/entries', [EntryController::class, 'index'])->name('entry.index');
    Route::get('/entries/{id}', [EntryController::class, 'show'])->name('entry.show');
});

Route::middleware(['auth', 'can:edit entries'])->group(function () {
    Route::get('/entries/{id}/edit', [EntryController::class, 'edit'])->name('entry.edit');
    Route::patch('/entries/{id}', [EntryController::class, 'update'])->name('entry.update');
});

Route::middleware(['auth', 'can:delete entries'])->group(function () {
    Route::delete('/entries/{id}', [EntryController::class, 'edit'])->name('entry.delete');
});

/**
 * LOGBOOKS
 */
Route::get('/logbooks', [LogbookController::class, 'index'])->name('logbooks.index');

Route::middleware((['auth', 'can:create logbooks']))->group(function () {
    Route::get('/logbooks/create', [LogbookController::class, 'create'])->name('logbooks.create');
    Route::post('/logbooks', [LogbookController::class, 'store'])->name('logbooks.store');
});

Route::middleware((['auth', 'can:edit logbooks']))->group(function () {
    Route::get('/logbooks/{id}', [LogbookController::class, 'edit'])->name('logbooks.edit');
    Route::patch('/logbooks/{id}', [LogbookController::class, 'update'])->name('logbooks.update');
});

Route::middleware((['auth', 'can:delete logbooks']))->group(function () {
    Route::delete('/logbooks/{id}', [LogbookController::class, 'delete'])->name('logbooks.delete');
});

require __DIR__.'/auth.php';
