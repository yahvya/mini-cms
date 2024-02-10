<?php

namespace App\Http\Controllers;

use App\Models\ArticleModel;
use App\Models\UserModel;
use App\Models\Website;
use GuzzleHttp\Psr7\Request as Psr7Request;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use PhpParser\NodeVisitor\FirstFindingVisitor;

class SlideController extends Controller{

    /**
     * affiche la liste des sites de la personne
     */
    public function showWebsites(Request $request){
        // récupération de la liste des sites de l'utilisateur
        return view("site-manager/show-websites-list",[
            "websites" => UserModel::where(["id" => $request->session()->get("wuser")["id"]])->first()->websites
        ]);
    }

    /**
     * Valide la création d'un site
     */
    public function validateSite(Request $request){
       $site= $request->validate([
            "site-name"=>"required",
            "Text-color"=>"required",
            "Background-page"=>"required",
            "Separation-color"=>"required",
            "site"=>"required"
        ]);

        $siteFolder = uniqid();
        Storage::makeDirectory("/public/{$siteFolder}");

        // génération du nom du fichier unique
        $filename = uniqid("/public/{$siteFolder}/") . ".json";
        $site1 = @json_decode($site["site"],true);
        $site1["colors"] =  [
            "textColor" => $site["Text-color"],
            "Background"=>$site["Background-page"],
            "Separation-color"=>$site["Separation-color"]
        ];

        // création de l'image du site
        $image = imagecreatetruecolor(10* count(str_split($site["site-name"])),50);

        imagefill($image, 0, 0,imagecolorallocate($image,255,255,255));

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
        $site2->user_id=$request->session()->get("wuser")["id"];

        if(!$site2->save() ){ 
            Storage::delete($filename);
            Session::flash("site-error","Echec de création du site");
            return redirect()->route("admin.new-website");
        }

        // création de l'article
        $article = new ArticleModel();

        $article->contenu = json_encode($site1["articleTemplate"]);
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
    public function createNewArticle($websiteId){
        $article= ArticleModel::where(["id_1"=>"$websiteId"])->first();
        if($article==null){
            return redirect()->route("admin.home");
        }
        return view("site-manager/nouveau-article",[
            "article"=>$article,
            "websiteId"=>$websiteId
        ]);
    }

    /**
     * valide la création d'un nouvel article
     * @param int $websiteId l'id du site
     */
    public function validateNewArticle(int $websiteId,Request $request){
    
        $site = $request->validate([
            "title"=>"required",
            "new-article"=>"required"
        ]);


        // création de l'article
        $article = new ArticleModel();

        $article->contenu = json_encode([
            "title" =>$site["title"],
            "page-content" => json_decode($site["new-article"],true)
        ]);

        $article->id_1 = $websiteId;

        if(!$article->save() ){
            Session::flash("site-error","Echec de création de l'article");
            return redirect()->route("admin.new-website");
        }
        return "page des articles";
        // return redirect()->route("admin.home");
    }

    /**
     * affiche la liste des articles d'un site
     * @param int $websiteId l'id du site
     */
    public function listeArticles($websiteId){
        $website = Website::where(["id"=>$websiteId])->first();

        if($website == null){
            return redirect()->route("admin.home");
        }
        return view("site-manager/listeArticle",[
            "Articles"=>$website->articles,
            "websiteId" => $websiteId
        ]);
    }

    /**
     * supprime un article
     * @param int $websiteId l'id du site
     * @param int $articleId l'id de l'article
     */
    public function deleteArticle($websiteId,$articleId){
        $article = ArticleModel::where(["id"=>$articleId,"id_1"=>$websiteId])->first();
        if($article == null){
            return redirect()->route("admin.home");
        }
        $article->delete();
        return redirect()->route("listeArtciles",["websiteId"=>$websiteId]);
    }

    /**
     * affiche les commentaires d'un article
     * @param int $websiteId l'id du site
     * @param int $articleId l'id de l'article
     */
    public function seeComments($websiteId,$articleId){
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
}
