<?php

use App\Http\Controllers\bonjourcontroller;
use Illuminate\Support\Facades\Route;

Route::get("/affiche-bonjour",[bonjourcontroller::class,"afficheBonjour"]);
