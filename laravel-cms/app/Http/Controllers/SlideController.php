<?php

namespace App\Http\Controllers;

use App\Models\ArticleModel;
use App\Models\UserModel;
use App\Models\Website;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;

class SlideController extends Controller{

    public function showWebsites(Request $request){
        // récupération de la liste des sites de l'utilisateur
        return view("site-manager/show-websites-list",[
            "websites" => UserModel::where(["id" => $request->session()->get("wuser")["id"]])->first()->websites
        ]);
    }
    public function validateSite(Request $request){
       $site= $request->validate([
            "site-name"=>"required",
            "Text-color"=>"required",
            "Background-page"=>"required",
            "Separation-color"=>"required",
            "site"=>"required"
        ]);

       // génération du nom du fichier unique
       $filename = uniqid("/public/") . ".json";
       $site1 = @json_decode($site["site"],true);
        $site1["colors"] =  [
            "textColor" => $site["Text-color"],
            "Background"=>$site["Background-page"],
            "Separation-color"=>$site["Separation-color"]
        ];

        Storage::put($filename,json_encode($site1,JSON_PRETTY_PRINT) );
        //creation du site
        $site2= new Website();
        $site2->site_config_file_path=$filename;
        $site2->website_name=$site["site-name"];
        $site2->user_id=$request->session()->get("wuser")["id"];

        if(!$site2->save() ){
            Storage::delete($filename);
            Session::flash("login-error","Echec de création du site");
            return redirect()->route("admin.new-website");
        }

        // création de l'article
        $article = new ArticleModel();

        $article->contenu = json_encode($site1["articleTemplate"]);
        $article->id_1 = $site2->id;

        if(!$article->save() ){
            Storage::delete($filename);
            Session::flash("login-error","Echec de création de l'article");
            return redirect()->route("admin.new-website");
        }

        return redirect()->route("admin.home");
    }
   public function NewWebSite() {
        return view("site-manager/site");

    }
}
