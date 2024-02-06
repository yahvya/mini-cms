<?php

namespace App\Http\Controllers;

use App\Models\UserModel;
use Illuminate\Http\Request;

class SlideController extends Controller{
    public function showWebsites(Request $request){
        // récupération de la liste des sites de l'utilisateur
        return view("site-manager/show-websites-list",[
            "websites" => UserModel::where(["id" => $request->session()->get("wuser")["id"]])->first()->websites
        ]);
    }
   public function NewWebSite() {
        return view("site-manager/site");

    }
}
