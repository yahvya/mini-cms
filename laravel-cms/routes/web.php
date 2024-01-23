<?php

use Illuminate\Support\Facades\Route;

//liens de connexion
Route::prefix("/connexion")->group(function():void {
    Route::view("/", "login/login")->name("login.login");
});

//liens d'inscription
Route::prefix("/inscription")->group(function():void{
    Route::view("/","register/register")->name("register.register");
});
