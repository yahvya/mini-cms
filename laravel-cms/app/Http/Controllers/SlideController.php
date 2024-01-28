<?php

namespace App\Http\Controllers;

class SlideController extends Controller{
    public function showWebsites(){
        // récupération de la liste des sites de l'utilisateur



        return view("site-manager/show-websites-list");
    }
}
