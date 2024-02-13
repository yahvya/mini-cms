<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\SiteAdminController;
use App\Http\Controllers\SiteController;
use App\Http\Middleware\AuthMiddleware;
use App\Http\Middleware\NotAuthMiddleware;
use Illuminate\Support\Facades\Route;
use Illuminate\View\Factory;
use Illuminate\View\View;

Route::get("/",fn() => redirect()->route("login.login"));

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
    Route::get("/deconnexion",[LoginController::class,"logout"]);
    Route::get("/",[SiteAdminController::class,"showWebsites"])->name("admin.home");
    Route::get("/Nouveau-site",[SiteAdminController::class, "NewWebSite"])->name("admin.new-website");
    Route::get("/gestion/{websiteId}",[SiteAdminController::class,"createNewArticle"])->name("admin.manage")->where([
        "websiteId" => "[0-9]+"
    ]);
    Route::post("/Mon-site",[SiteAdminController::class,"validateSite"])->name("mon-site");
    Route::post("/nouveau-article/{websiteId}",[SiteAdminController:: class,"validateNewArticle"])->name("validateNewArticle")->where([
        "websiteId" => "[0-9]+"]);
    Route::get("/liste-articles/{websiteId}",[SiteAdminController::class, "listArticles"])->name("listeArtciles")->where([
        "websiteId" => "[0-9]+"]);
    Route::get("/supprimer/{websiteId}/{articleId}",[SiteAdminController::class,"deleteArticle"])->name("deleteArticle")->where([
        "websiteId" => "[0-9]+",
        "articleId" => "[0-9]+"
    ]);
    Route::get("/voir-commentaires/{websiteId}/{articleId}",[SiteAdminController::class,"seeComments"])->name("seeComments")->where([
        "websiteId" => "[0-9]+",
        "articleId" => "[0-9]+"
    ]);
    Route::get("/gerer-etat-commentaire/{websiteId}/{articleId}/{commentId}",[SiteAdminController::class,"manageFeedback"])
        ->name("admin.manage-comment")
        ->where([
            "websiteId" => "[0-9]+",
            "articleId" => "[0-9]+",
            "commentId" => "[0-9]+"
        ]);
});

// liens de visionnage d'un site
Route::prefix("/site/{websiteName}")
    ->group(function():void{
        Route::get("/logo",[SiteController::class,"getLogo"])->name("site.logo");
        Route::post("/commentaires/ajouter/{articleId}",[SiteController::class,"addFeedback"])
            ->name("add-feedback")
            ->where([
                "websiteName" => ".+",
                "articleId" => "[0-9]+"
            ]);
        Route::get("/article/{articleId?}",[SiteController::class,"showArticle"])->name("showArticle")->where([
            "articleId" => "[0-9]+"
        ]);

        Route::get("/{pageLink}",[SiteController::class,"showPage"])->name("showHome")->where([
            "pageLink" => ".+"
        ]);
    })->where([
        "websiteName" => ".+"
    ]);


// page 404 par défaut
Route::fallback(function():Factory|View{
    return view("default-pages/not-found");
});
