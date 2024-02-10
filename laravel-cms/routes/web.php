<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\SlideController;
use App\Http\Middleware\AuthMiddleware;
use App\Http\Middleware\NotAuthMiddleware;
use Illuminate\Support\Facades\Route;
use Illuminate\View\Factory;
use Illuminate\View\View;

//liens de connexion
Route::prefix("/connexion")->middleware(NotAuthMiddleware::class)->group(function():void {
    Route::view("/", "login/login")->name("login.login");
    Route::post("/confirm",[LoginController::class,"validateLogin"])->name("login.validate");
});

//liens d'inscription
Route::prefix("/inscription")->middleware(NotAuthMiddleware::class)->group(function():void{
    Route::view("/","register/register")->name("register.register");
    Route::post("/confirm",[RegisterController::class,"validateRegistration"])->name("register.validate");
});


// liens d'administration des sites d'une personne
Route::prefix("/admin")->middleware(AuthMiddleware::class)->group(function(){
    Route::get("/",[SlideController::class,"showWebsites"])->name("admin.home");
    Route::get("/Nouveau-site",[SlideController::class, "NewWebSite"])->name("admin.new-website");
    Route::post("/Mon-site",[SlideController::class,"validateSite"])->name("mon-site");
    Route::get("/gestion/{websiteId}",[SlideController::class,"manageSite"])->name("admin.manage")->where([
        "websiteId" => "[0-9]+"
    ]);
    Route::post("/nouveau-artcile/{websiteId}",[SlideController:: class,"validateNewArticle"])->name("validateNewArticle")->where([
        "websiteId" => "[0-9]+"
    ]);

});


// page 404 par défaut
Route::fallback(function():Factory|View{
    return view("default-pages/not-found");
});
