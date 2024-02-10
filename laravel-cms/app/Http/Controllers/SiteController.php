<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SiteController extends Controller
{
    /**
     * affiche un article du site fourni
     * @param string $websiteName nom du site
     * @param int $articleId id de l'article
     */
    public function showArticle(string $websiteName,int $articleId){
        // on vérifie que le site et l'article existent

        // récupération des données de configuration du site (couleurs ...)

        // récupération des données de l'article

        // affichage de la page
    }

    /**
     * affiche une page du site fourni
     * @param string $websiteName nom du site
     * @param string $pageLink lien de la page
     */
    public function showPage(string $websiteName,string $pageLink){
        // on vérifie que le site et la page existent

        // récupération des données de configuration du site (couleurs ...)

        // récupération des données de la page

        // affichage du site
    }
}
