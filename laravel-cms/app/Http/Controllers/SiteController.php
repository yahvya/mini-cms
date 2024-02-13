<?php

namespace App\Http\Controllers;

use App\Models\ArticleModel;
use App\Models\FeedbackModel;
use App\Models\Website;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Session;

class SiteController extends Controller
{
    /**
     * affiche un article du site fourni
     * @param string $websiteName nom du site
     * @param int $articleId id de l'article
     */
    public function showArticle(string $websiteName,int $articleId,Request $request){
        // on vérifie que le site et l'article existent
        $website = Website::where(["website_formatted_name" => $websiteName])->first();

        if($website === null) return redirect("/page-non-trouve");

        $article = ArticleModel::where(["id_1" => $website->id,"id" => $articleId])->first();

        if($article === null) return redirect("/page-non-trouve");

        // récupération des données de configuration du site (couleurs ...)
        $config = $this->getWebsiteConf($website->site_config_file_path);

        if($config === null) return redirect("/page-non-trouve");

        // affichage de la page
        return view("site-manager/site-page",[
            "articleId" => $article->id,
            "colors" => $config["colors"],
            "pageDatas" => json_decode($article->contenu,true),
            "prefix" => route("showHome",["websiteName" => $website->website_formatted_name,"pageLink" => "-replace-"]),
            "addHistory" => true,
            "websiteName" => $website->website_formatted_name
        ]);
    }

    /**
     * affiche une page du site fourni
     * @param string $websiteName nom du site
     * @param string $pageLink lien de la page
     */
    public function showPage(string $websiteName,string $pageLink){
        $pageLink = "/{$pageLink}";

        // on vérifie que le site
        $website = Website::where(["website_formatted_name" => $websiteName])->first();

        if($website === null) return redirect("/page-non-trouve");

        // récupération des données de configuration du site (couleurs ...)
        $config = $this->getWebsiteConf($website->site_config_file_path);

        // récupération des données de la page
        $page = null;

        foreach($config["pages"] as $currentPage){
            if($currentPage["pageLink"] == $pageLink){
                $page = $currentPage;
                break;
            }
        }

        if($page == null) return redirect("/page-non-trouve");

        // affichage de la page
        return view("site-manager/site-page",[
            "colors" => $config["colors"],
            "pageDatas" => $page,
            "prefix" => route("showHome",["websiteName" => $website->website_formatted_name,"pageLink" => "-replace-"]),
            "addHistory" => false,
            "websiteName" => $website->website_formatted_name
        ]);
    }

    /**
     * Ajoute un commentaire sur un article
     * @param string $websiteName nom du site formaté
     * @param int $articleId id de l'article
     */
    public function addFeedback(string $websiteName,int $articleId,Request $request){
        // récupération des données
        $datas = $request->validate([
            "username" => "required|min:2|max:60",
            "feedback" => "required|min:10|max:250"
        ]);

        // vérification d'existance du site et de l'article
        $website = Website::where(["website_formatted_name" => $websiteName])->first();

        if($website == null) return redirect()->back();

        $article = ArticleModel::where(["id_1" => $website->id,"id" => $articleId])->first();

        if($article == null) return redirect()->back();

        // création du commentaire
        $feedback = new FeedbackModel();

        $feedback->contenu = $datas["feedback"];
        $feedback->user_name = $datas["username"];
        $feedback->id_1 = $article->id;

        if($feedback->save() ) Session::flash("feedback.success","Votre commentaire à bien été ajouté");

        return redirect()->back();
    }

    /**
     * Récupère la configuration du site fourni
     * @param string $confFilePath chemin du fichier de configuration
     * @return array|null la configuration sous forme de tableau ou null
     */
    private function getWebsiteConf(string $confFilePath):array|null{
        return Storage::json($confFilePath);
    }
}
