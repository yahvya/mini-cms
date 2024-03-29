<?php

namespace App\Http\Controllers;

use App\Models\ArticleModel;
use App\Models\FeedbackModel;
use App\Models\UserModel;
use App\Models\Website;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SiteAdminController extends Controller{

    /**
     * affiche la liste des sites de la personne
     */
    public function showWebsites(Request $request){
        // récupération de la liste des sites de l'utilisateur
        return view("site-manager/show-websites-list",[
            "websites" => array_map(function(array $websiteDatas):array{
                $websiteDatas["theme"] = SiteController::getWebsiteConf($websiteDatas["site_config_file_path"])["colors"];

                return $websiteDatas;
            },UserModel::where(["id" => $request->session()->get("wuser")["id"]])->first()->websites->toArray() )
        ]);
    }

    /**
     * Valide la création d'un site
     */
    public function validateSite(Request $request){
       $site= $request->validate([
            "site-name"=>"required|min:2|max:30",
            "Text-color"=>"required",
            "Background-page"=>"required",
            "Separation-color"=>"required",
            "site"=>"required"
        ]);

       if(Website::where(["website_name" => $site["site-name"]])->first() !== null ){
           Session::flash("site-error","Le nom du site est déjà pris");
           return redirect()->route("admin.new-website");
       }

        $siteFolder = uniqid();
        Storage::makeDirectory("/public/{$siteFolder}");

        // génération du nom du fichier unique
        $filename = uniqid("/public/{$siteFolder}/") . ".json";
        $site1 = @json_decode($site["site"],true);
        $site1["colors"] =  [
            "textColor" => $site["Text-color"],
            "Background"=>$site["Background-page"],
            "Separation-color"=> $site["Separation-color"]
        ];

        $articleTemplate = $site1["articleTemplate"];
        unset($site1["articleTemplate"]);

        // création de l'image du site
        $image = imagecreatetruecolor(10 * count(str_split($site["site-name"])),50);

        imagefill($image, 0, 0,imagecolorallocate($image,229,225,190) );

        if(
            !imagestring($image,5,5,5,$site["site-name"],0) ||
            !imagepng($image,storage_path("/app/public/{$siteFolder}/site-image.png"))
        ){
            Session::flash("site-error","Echec de création de l'image du site");
            return redirect()->route("admin.new-website");
        }

        Storage::put($filename,json_encode($site1,JSON_PRETTY_PRINT) );
        //creation du site
        $site2= new Website();
        $site2->site_config_file_path=$filename;
        $site2->website_name=$site["site-name"];
        $site2->website_formatted_name = $this->formatWebsiteName($site["site-name"]);
        $site2->user_id=$request->session()->get("wuser")["id"];

        if(!$site2->save() ){
            Storage::delete($filename);
            Session::flash("site-error","Echec de création du site");
            return redirect()->route("admin.new-website");
        }

        // création de l'article
        $article = new ArticleModel();

        $article->contenu = json_encode($articleTemplate);
        $article->id_1 = $site2->id;

        if(!$article->save() ){
            Storage::delete($filename);
            Session::flash("site-error","Echec de création de l'article");
            return redirect()->route("admin.new-website");
        }
        return redirect()->route("admin.home");
    }

    /**
     * Affiche la page de création d'un nouveau site
     */
   public function NewWebSite() {
        return view("site-manager/site");
    }

    /**
     * Affiche la page de création d'un nouvel article
     * @param int $websiteId l'id du site
     */
    public function createNewArticle(int $websiteId){
        $article= ArticleModel::where(["id_1"=>"$websiteId"])->first();
        if($article==null){
            return redirect()->route("admin.home");
        }
        return view("site-manager/new-article",[
            "article"=>$article,
            "websiteId"=>$websiteId
        ]);
    }

    /**
     * valide la création d'un nouvel article
     * @param int $websiteId l'id du site
     */
    public function validateNewArticle(int $websiteId,Request $request){
        $website = Website::where(["id" => $websiteId])->first();

        if($website == null || !$this->isMyWebsite($website,$request) ) return redirect()->back();

        $site = $request->validate([
            "page-title"=>"required|min:2|max:30",
            "new-article"=>"required"
        ]);

        // création de l'article
        $article = new ArticleModel();

        $article->contenu = json_encode([
            "title" => $site["page-title"],
            "page-content" => json_decode($site["new-article"],true)
        ]);

        $article->id_1 = $websiteId;

        if(!$article->save() ){
            Session::flash("site-error","Echec de création de l'article");
            return redirect()->route("admin.new-website");
        }

        return redirect()->route("listeArtciles",["websiteId" => $websiteId]);
    }

    /**
     * affiche la liste des articles d'un site
     * @param int $websiteId l'id du site
     */
    public function listArticles(int $websiteId,Request $request){
        $website = Website::where(["id"=>$websiteId])->first();

        if($website == null || !$this->isMyWebsite($website,$request) ){
            return redirect()->route("admin.home");
        }

        return view("site-manager/listeArticle",[
            "Articles"=>$website->articles,
            "websiteId" => $websiteId,
            "websiteName" => $website->website_formatted_name
        ]);
    }

    /**
     * supprime un article
     * @param int $websiteId l'id du site
     * @param int $articleId l'id de l'article
     */
    public function deleteArticle(string $websiteId,int $articleId,Request $request){
        $website = Website::where(["id" => $websiteId])->first();

        if($website == null || !$this->isMyWebsite($website,$request) ) return redirect()->back();

        $article = ArticleModel::where(["id"=>$articleId,"id_1"=>$websiteId])->first();

        if($article == null){
            return redirect()->route("admin.home");
        }
        FeedbackModel::destroy(["id_1" => $articleId]);

        $article->delete();
        return redirect()->route("listeArtciles",["websiteId"=>$websiteId]);
    }

    /**
     * affiche les commentaires d'un article
     * @param int $websiteId l'id du site
     * @param int $articleId l'id de l'article
     */
    public function seeComments(string $websiteId,int $articleId,Request $request){
        $website = Website::where(["id" => $websiteId])->first();

        if($website == null || !$this->isMyWebsite($website,$request) ) return redirect()->back();

        $article = ArticleModel::where(["id"=>$articleId,"id_1"=>$websiteId])->first();
        if($article == null){
            return redirect()->route("admin.home");
        }
        return view("site-manager/seeComments",[
            "comments"=>$article->feedbacks,
            "websiteId"=>$websiteId,
            "articleId"=>$articleId
        ]);
    }

    /**
     * Gère le status d'un commentaire
     * @param int $websiteId id du site web
     * @param int $articleId id de l'article
     * @param int $commentId id du commentaire
     * @param Request $request
     */
    public function manageFeedback(int $websiteId,int $articleId,int $commentId,Request $request){
        $website = Website::where(["id" => $websiteId])->first();

        if($website == null || !$this->isMyWebsite($website,$request) ) return redirect()->back();

        $article = ArticleModel::where(["id_1" => $websiteId,"id" => $articleId])->first();

        if($article == null) return redirect()->back();

        $feedback = FeedbackModel::where(["id" => $commentId,"id_1" => $articleId])->first();

        if($feedback !== null){
            // on inverse le status
            $feedback->status = !$feedback->status;
            $feedback->save();
        }

        return redirect()->back();
    }

    /**
     * met à jour le thème d'un site
     * @return void
     */
    public function updateTheme(Request $request){
        $datas = $request->validate([
            "website-id" => "required",
            "textColor" => "required",
            "Background" => "required",
            "Separation-color" => "required"
        ]);

        // recherche du site et récupération de la configuration
        $website = Website::where(["id"=> $datas["website-id"]])->first();

        if($website == null || !$this->isMyWebsite($website,$request) )
            return redirect()->route("admin.home");

        $config = SiteController::getWebsiteConf($website->site_config_file_path);

        if($config == null) return redirect()->route("admin.home");

        $config["colors"] = [
            "textColor" => $datas["textColor"],
            "Background" => $datas["Background"],
            "Separation-color" => $datas["Separation-color"]
        ];

        Storage::put($website->site_config_file_path,json_encode($config,JSON_PRETTY_PRINT) );

        return response()->json([
            "nextToken" => csrf_token(),
            "newThemeConfig" => $config["colors"]
        ]);
    }

    /**
     * Formate le nom du site fourni
     * @param string $websiteName nom du site
     * @return string le nom du site formaté
     */
    private function formatWebsiteName(string $websiteName):string{
        return Str::snake($websiteName,"-");
    }

    /**
     * @param Website $websiteModel le site
     * @return bool si le site passé est le site de l'utilisateur connecté
     */
    private function isMyWebsite(Website $websiteModel,Request $request):bool{
        return $websiteModel->user_id == $request->session()->get("wuser")["id"];
    }
}
