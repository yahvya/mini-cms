<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use Illuminate\Support\Facades\Route;
use Illuminate\View\Factory;
use Illuminate\View\View;

//liens de connexion
Route::prefix("/connexion")->group(function():void {
    Route::view("/", "login/login")->name("login.login");
    Route::post("/confirm",[LoginController::class,"validateLogin"])->name("login.validate");
});

//liens d'inscription
Route::prefix("/inscription")->group(function():void{
    Route::view("/","register/register")->name("register.register");
    Route::post("/confirm",[RegisterController::class,"validateRegistration"])->name("register.validate");
});


// page 404 par défaut
Route::fallback(function():Factory|View{
    return view("default-pages/not-found");
});
